import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { IEscola } from '../models/escolas';
import { IEstado } from '../models/estado';
import { ICidade } from '../models/cidade';

// Processa a busca por escolas baseado em filtros
export async function getEscolas(req: Request, res: Response): Promise<Response> {
    const conn = getConnection()
    // URL params
    const page = parseInt(req.query.page) || 1;
    const per_page = parseInt(req.query.per_page) || 70;
    const filterBy = req.query.filterBy;
    const filter = req.query.filter;
    const orderBy = req.query.orderBy;
    const order = req.query.order || 'ASC';

    // Busca o total de registros na tela
    const results = await conn.query('SELECT COUNT(co_entidade) as total FROM escolas')
    const maxPages = Math.ceil(results[0].total / per_page)

    // Calcula o offset das linhas
    const offset = calculaOffset(page, per_page);
    var builder = conn.createQueryBuilder()
    builder.select('*').from('escolas', 'escolas').limit(per_page).offset(offset)
    
    if(filterBy && filter){
        builder = queryWhere(filterBy, filter, builder);
    }

    const escolas: IEscola[] = await builder.execute()
    const response = {
        data: escolas,
        per_page: per_page,
        maxPages: maxPages,
        filter: filter,
        filterBy: filterBy,
    }

    return res.json(response);
}

function calculaOffset(page: number, limit: number): number{
    return ((page - 1) * limit) + 1;
}

function queryWhere(filterBy: String, filter: String, builder: any): any{
    if(filterBy === "cidade"){
        return builder.leftJoin("cidades", "cidades", "cidades.codigo = escolas.co_municipio").where("cidades.municipio = :nome",{nome: filter});
    }
    if(filterBy === "estado"){
        return builder.leftJoin("estados", "estados", "estados.codigo = escolas.co_uf").where("estados.estado = :nome",{nome: filter});
    }
    return builder;
}

export async function getEstatisticasEscolas(req: Request, res: Response): Promise<Response>{
    const conn = getConnection(); 
    var builderEscolas = conn.createQueryBuilder();

    const filterBy = req.query.by;
        
    const columns = ["co_entidade", "co_uf", "co_municipio", "in_agua_filtrada", "in_agua_inexistente", "in_esgoto_inexistente", "in_energia_inexistente", "in_lixo_recicla", 
                     "in_lixo_coleta_periodica", "in_laboratorio_informatica", "in_sala_atendimento_especial", "in_laboratorio_ciencias", "in_biblioteca",
                      "in_sala_leitura", "in_internet", "in_bandalarga"]

    // Obtém dados das escolas
    builderEscolas.select(columns).from('escolas', 'escolas').orderBy('co_uf');
    let dadosEscolas = await builderEscolas.execute();
    
    //Obtém estatísticas por cidade ou estado

    const builder = filterBy === 'cidade' ? getBuilderCidade() : getBuilderEstado();
    const data: any[]  = await builder.execute();
    
    let estatisticas: any = [];
    data.forEach((data: any) => {
        let estatistica = filterBy === 'cidade' ? getEstatisticaCidade(data, dadosEscolas) : getEstatisticaEstado(data, dadosEscolas);
        estatisticas.push(estatistica);
    })

    
    return res.json(estatisticas);
}

// Retorna estatísticas por cidade
function getEstatisticaCidade(cidade: ICidade, dadosEscolas: any) {
    let escolasCidade = dadosEscolas.filter((escola: any) => {
        return escola.co_municipio  === cidade.codigo;
    })

    let escolasQtd = escolasCidade.length;
    let aguaFiltrada = amountFiltered(escolasCidade, { 'property': 'in_agua_filtrada', 'value': 1 });
    let aguaInexistente = amountFiltered(escolasCidade, { 'property': 'in_esgoto_inexistente', 'value': 1 });
    let esgotoInexistente = amountFiltered(escolasCidade, { 'property': 'in_esgoto_inexistente', 'value': 1 });
    let energiaInexistente = amountFiltered(escolasCidade, { 'property': 'in_energia_inexistente', 'value': '1' });
    let lixoRecicla = amountFiltered(escolasCidade, { 'property': 'in_lixo_recicla', 'value': 1 });
    let coletaPeriodica = amountFiltered(escolasCidade, { 'property': 'in_lixo_coleta_periodica', 'value': 1 });
    let laboratorioInformatica = amountFiltered(escolasCidade, { 'property': 'in_laboratorio_informatica', 'value': 1 });
    let salaAtendimentoEspecial = amountFiltered(escolasCidade, { 'property': 'in_sala_atendimento_especial', 'value': 1 });
    let laboratorioCiencias = amountFiltered(escolasCidade, { 'property': 'in_laboratorio_ciencias', 'value': 1 });
    let biblioteca = amountFiltered(escolasCidade, { 'property': 'in_biblioteca', 'value': 1 });
    let salaLeitura = amountFiltered(escolasCidade, { 'property': 'in_sala_leitura', 'value': 1 });
    let internet = amountFiltered(escolasCidade, { 'property': 'in_internet', 'value': 1 });
    let bandaLarga = amountFiltered(escolasCidade, { 'property': 'in_bandalarga', 'value': 1 });

    const estatistica = {
        'codigo': cidade.codigo,
        'estado': cidade.municipio,
        'qtdEscolas': escolasQtd,
        'porcentagemAguaFiltrada': calcularPorcentagem(escolasQtd, aguaFiltrada),
        'porcentagemAguaInexistente': calcularPorcentagem(escolasQtd, aguaInexistente),
        'porcentagemEsgotoInexistente': calcularPorcentagem(escolasQtd, esgotoInexistente),
        'porcentagemEnergiaInexistente': calcularPorcentagem(escolasQtd, energiaInexistente),
        'porcentagemLixoRecicla': calcularPorcentagem(escolasQtd, lixoRecicla),
        'porcentagemLixoColetaPeriodica': calcularPorcentagem(escolasQtd, coletaPeriodica),
        'porcentagemLaboratorioInformatica': calcularPorcentagem(escolasQtd, laboratorioInformatica),
        'porcentagemSalaAtendimentoEspecial': calcularPorcentagem(escolasQtd, salaAtendimentoEspecial),
        'porcentagemLaboratorioCiencias': calcularPorcentagem(escolasQtd, laboratorioCiencias),
        'porcentagemBiblioteca': calcularPorcentagem(escolasQtd, biblioteca),
        'porcentagemSalaLeitura': calcularPorcentagem(escolasQtd, salaLeitura),
        'porcentagemInternet': calcularPorcentagem(escolasQtd, internet),
        'porcentagemBandaLarga': calcularPorcentagem(escolasQtd, bandaLarga),
    };

    return estatistica;
}

// Retorna estatísticas por estado
function getEstatisticaEstado(estado: IEstado, dadosEscolas: any) {
    // Retorna escolas pelo código do estado
    let escolasEstado = dadosEscolas.filter((escola: any) => {
        return escola.co_uf === estado.codigo;
    })
    
    let escolasQtd = escolasEstado.length;
    let aguaFiltrada = amountFiltered(escolasEstado, {'property':'in_agua_filtrada', 'value': 1});
    let aguaInexistente = amountFiltered(escolasEstado, {'property': 'in_esgoto_inexistente', 'value': 1});
    let esgotoInexistente = amountFiltered(escolasEstado, {'property': 'in_esgoto_inexistente', 'value': 1});
    let energiaInexistente = amountFiltered(escolasEstado, {'property':'in_energia_inexistente', 'value': '1'});
    let lixoRecicla = amountFiltered(escolasEstado, {'property': 'in_lixo_recicla', 'value':1});
    let coletaPeriodica = amountFiltered(escolasEstado, {'property':'in_lixo_coleta_periodica', 'value': 1});
    let laboratorioInformatica = amountFiltered(escolasEstado, {'property':'in_laboratorio_informatica', 'value': 1});
    let salaAtendimentoEspecial = amountFiltered(escolasEstado, {'property': 'in_sala_atendimento_especial', 'value': 1});
    let laboratorioCiencias = amountFiltered(escolasEstado, {'property':'in_laboratorio_ciencias', 'value': 1});
    let biblioteca = amountFiltered(escolasEstado, {'property':'in_biblioteca', 'value': 1});
    let salaLeitura = amountFiltered(escolasEstado, {'property':'in_sala_leitura', 'value': 1});
    let internet = amountFiltered(escolasEstado, {'property': 'in_internet', 'value': 1});
    let bandaLarga = amountFiltered(escolasEstado, {'property': 'in_bandalarga', 'value': 1});

    const estatistica = {
        'codigo': estado.codigo,
        'estado': estado.estado,
        'uf': estado.uf,
        'qtdEscolas': escolasQtd,
        'porcentagemAguaFiltrada': calcularPorcentagem(escolasQtd, aguaFiltrada),
        'porcentagemAguaInexistente': calcularPorcentagem(escolasQtd, aguaInexistente),
        'porcentagemEsgotoInexistente': calcularPorcentagem(escolasQtd, esgotoInexistente),
        'porcentagemEnergiaInexistente': calcularPorcentagem(escolasQtd, energiaInexistente),
        'porcentagemLixoRecicla': calcularPorcentagem(escolasQtd, lixoRecicla),
        'porcentagemLixoColetaPeriodica': calcularPorcentagem(escolasQtd, coletaPeriodica),
        'porcentagemLaboratorioInformatica': calcularPorcentagem(escolasQtd, laboratorioInformatica),
        'porcentagemSalaAtendimentoEspecial': calcularPorcentagem(escolasQtd, salaAtendimentoEspecial),
        'porcentagemLaboratorioCiencias': calcularPorcentagem(escolasQtd, laboratorioCiencias),
        'porcentagemBiblioteca': calcularPorcentagem(escolasQtd, biblioteca),
        'porcentagemSalaLeitura': calcularPorcentagem(escolasQtd, salaLeitura),
        'porcentagemInternet': calcularPorcentagem(escolasQtd, internet),
        'porcentagemBandaLarga': calcularPorcentagem(escolasQtd, bandaLarga),
    };

    return estatistica;
}

function getBuilderEstado(where?: any) {
    const builder = getConnection().createQueryBuilder();

    if (where) {
        return builder.select('*').from('estados', 'estados').where(where.condition, where.value);
    }
    return builder.select('*').from('estados', 'estados');
}

function getBuilderCidade(where?: any) {
    const builder = getConnection().createQueryBuilder();

    if(where) {
        return builder.select('*').from('cidades', 'cidades').where(where.condition, where.value);
    }

    return builder.select('*').from('cidades', 'cidades')
}

function calcularPorcentagem(total: number, valor: number){
    return valor/total;
}


function amountFiltered(array: any[], filter: any): number{
    return array.filter((data) => {
        return data[filter.property] === filter.value;
    }).length;
}


