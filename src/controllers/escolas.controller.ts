import { Request, Response } from 'express';
import { getConnection, Connection, SelectQueryBuilder } from 'typeorm';
import { IEscola, ITransformEscola } from '../models/escolas';

 
// Processa a busca por escolas baseado em filtros
// A busca pode ser realizada pelo nome, cidade e estado, ambos parâmetros são opcionais
// A paginação só é feita se não há nenhum filtro especificado para consulta
export async function getEscolas(req: Request, res: Response): Promise<Response>{
    const conn: Connection = getConnection();
    const page = parseInt(req.query.page) || 1;
    const per_page = parseInt(req.query.per_page) || 70;
    const filterByNome = req.query.no_entidade;
    const filterByEstado = req.query.estado;
    const filterByMunicipio = req.query.municipio;
    const orderBy = req.query.orderBy || 'nome';
    const order = req.query.order || 'ASC';
    const transformar = req.query.transformar;

    // Constrói a consulta base
    let queryBuilder = conn.createQueryBuilder();
    queryBuilder.select("escolas.*, estados.estado as 'cidade', cidades.municipio as 'municipio'").from("escolas", "escolas")
        .innerJoin("estados", "estados", "estados.codigo = escolas.co_uf")
        .innerJoin("cidades", "cidades", "cidades.codigo = escolas.co_municipio");

    // Adiciona os filtros e parâmetros especificados na query
    queryBuilder = setQueryFilters(queryBuilder, {page, per_page, filterByNome, filterByEstado, filterByMunicipio, orderBy, order});

    let response: any = {};

    // Se nenhum filtro foi especificado a query é paginada
    if(queryBuilder.getQueryAndParameters()[1].length <= 0) {
        let paginationData = await paginate(page, per_page);
        queryBuilder.limit(paginationData.per_page).offset(paginationData.offset);
        response.perPage = per_page;
        response.page = page;
        response.maxPages = paginationData.maxPages;
    }

    // Obtém os dados da consulta
    const dataEscolas = await queryBuilder.execute().catch((e) => {
        return res.status(500).json(({
            Error: "ocorreu um erro inesperado",
        }));
    });

    if (transformar) {
        response.data = getTransformedData(dataEscolas);
    } else {
        response.data = dataEscolas;
    }

    return res.json(response);
}

// Calcula total de paginas e offset 
// Retorna objeto com quantidade de registros por página, total de páginas e offset
async function paginate(page: number, per_page: number): Promise <any> {
    const conn = getConnection();
    let rs = await conn.query('SELECT COUNT(co_entidade) as total FROM escolas');
    const maxPages = Math.ceil(rs[0].total/per_page);
    const offset = calculaOffset(page, per_page);
    return {
        per_page: per_page,
        maxPages: maxPages,
        offset: offset,
    }
}

// Adiciona os filtros especificados na query
function setQueryFilters(queryBuilder: SelectQueryBuilder<any>, queryParams: any): SelectQueryBuilder<any> {
    // filtro por nome
    if(queryParams.filterByNome) {
        queryBuilder = createQueryFilter(queryBuilder, "escolas.no_entidade LIKE :nome", {nome: `%${queryParams.filterByNome}%`});
    } 

    // filtro por estado
    if(queryParams.filterByEstado) {
        queryBuilder = createQueryFilter(queryBuilder, "estados.estado = :estado", {estado: queryParams.filterByEstado});
    }

    // filtro por municipio
    if(queryParams.filterByMunicipio){
        queryBuilder = createQueryFilter(queryBuilder, "cidades.municipio = :municipio", {municipio: queryParams.filterByMunicipio});
    }

    // ordenação dos registros
    switch(queryParams.orderBy){
        case 'municipio':
            queryBuilder.orderBy('cidades.municipio', queryParams.order);
            break;
        case 'estado':
            queryBuilder.orderBy('estados.estado', queryParams.order);
            break; 
        case 'nome':
            queryBuilder.orderBy('escolas.no_entidade', queryParams.order);
    }

    return queryBuilder
}

// Adiciona o where na query
// Se já houver algum parâmetro na query usa query.andWhere()
function createQueryFilter(queryBuilder: SelectQueryBuilder<any>, queryWhere: string, filter: any){
    return queryBuilder.getQueryAndParameters()[1].length <= 0 ? queryBuilder.where(queryWhere, filter) : queryBuilder.andWhere(queryWhere, filter);
}


function calculaOffset(page: number, limit: number): number{
    return ((page - 1) * limit) + 1;
}

// Recupera registros de escolas pelo código da entidade
export async function  getEscolaByID(req: Request, res: Response): Promise<Response>{
    const conn = getConnection()
    const queryBuilder =  conn.createQueryBuilder();
    const co_entidade = req.params.co_entidade;

    //SELECT * FROM escolas WHERE co_entidade = ?
    queryBuilder.select("*").from("escolas", "escolas").where("co_entidade = :co_entidade", {co_entidade: co_entidade});
    const result: IEscola[] = await queryBuilder.execute().catch((e) => {
        return res.status(500).json({
            Error: "ocorreu um erro inesperado",
        })
    });

    if(result.length <= 0 ) {
        res.status(404).json({
            Error: "recurso não encontrado",
        })
    }

    return res.json(result[0]);
}


function getTransformedData(data: Array<IEscola>): Array<ITransformEscola>{
    let dataTransformed: Array<ITransformEscola> = [];
    data.map((data: IEscola) => {
        dataTransformed.push(transform(data));
    })
    return dataTransformed;
}


function transform(data: IEscola): ITransformEscola{
    let escola: ITransformEscola;

    return escola = {
        co_entidade: data.co_entidade,
        no_entidade: data.no_entidade,
        situacao_funcionamento: situacaoFuncionamento(data.tp_situacao_funcionamento),
        co_regiao: data.co_regiao,
        co_uf: data.co_uf,
        co_municipio: data.co_municipio,
        dependencia: transformDependencia(data.tp_dependencia),          
        tp_localização: transformLocalizacao(data.tp_localizacao),
        agua_filtrada: booleanToText(Boolean(data.in_agua_filtrada)),
        agua: booleanToText(!Boolean(data.in_agua_inexistente)),
        energia: booleanToText(!Boolean(data.in_energia_inexistente)),
        reciclagem: booleanToText(Boolean(data.in_lixo_recicla)),
        esgoto: booleanToText(!Boolean(data.in_agua_inexistente)),
        coletaDeLixo: booleanToText(Boolean(data.in_lixo_coleta_periodica)),
        laboratorioDeInformatica: booleanToText(Boolean(data.in_laboratorio_informatica)),
        salaAtendimentoEspecial: booleanToText(Boolean(data.in_sala_atendimento_especial)),
        laboratorioCiencias: booleanToText(Boolean(data.in_laboratorio_ciencias)),
        salaLeitura: booleanToText(Boolean(data.in_sala_leitura)),
        qtSalas: data.qt_salas_existentes,
        qtSalasUtilizadas: data.qt_salas_utilizadas,
        retroprojetor: booleanToText(Boolean(data.in_equip_retro_projetor)),
        equipamentoMultimidia: booleanToText(Boolean(data.in_equip_multimidia)),
        qtCompAluno: data.qt_comp_aluno,
        biblioteca: booleanToText(Boolean(data.in_biblioteca)),
        bibliotecaSalaLeitura: booleanToText(Boolean(data.in_biblioteca_sala_leitura)),
        internet: booleanToText(Boolean(data.in_internet)),
        bandaLarga: booleanToText(Boolean(data.in_bandalarga)),
        qtFuncionarios: data.qt_funcionarios,
        tp_aee: transformAee(data.tp_aee),
        tp_localizacao_diferenciada: transformLocalDif(data.tp_localizacao_diferenciada) 
    };
}

function booleanToText(item: boolean){
    return item ? 'Possui' : 'Não Possui';
}

function situacaoFuncionamento(item: number): string{
    switch(item){
        case 1: 
            return "Em atividade";
        case 2:
            return "Paralisada";
        case 3:
            return "Extinta no ano do censo";
        case 4:
            return "Extinta em anos anteriores";
        default:
            return "Desconhecido";
    }
}

function transformDependencia(item: number): string {
    switch(item){
        case 1:
            return 'Federal';
        case 2:
            return 'Estadual';
        case 3:
            return 'Municipal';
        case 4:
            return 'Privada';
        default: 
            return 'Desconhecido';
    }
}

function transformLocalizacao(item: number): string{
    switch(item){
        case 1:
            return "Urbana";
        case 2: 
            return "Rural";
        default:
            return "Desconhecida";
    }
}

function transformAee(item: number){
    switch(item){
        case 0:
            return "Não oferece";
        case 1:
            return "Não exclusivamente";
        case 2: 
            return "Exclusivamente";
        default:
            return "Desconhecido";
    }
}

function transformLocalDif(item: number): string{
    switch(item){
        case 0:
            return "Não está em localização diferenciada";
        case 1:
            return "Área de assentamento";
        case 2:
            return "Terra indígena";
        case 3:
            return "Área remanescente de quilombos";
        case 4:
            return "Unidade de uso sustentável";
        case 5: 
            return "Unidade de uso sustentável em terra indígena";
        case 6:
            return "Unidade de uso sustentável em área remanescente de quilombos";
        default:
            return "Desconhecido";
    }
}