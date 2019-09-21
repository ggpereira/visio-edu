// Modelo para estatísticas com escolas
export interface IEstatísticasEscolas{
    qtdEscolas: number;
    porcentagemAguaFiltrada: number;
    porcentagemAguaInexistente: number;
    porcentagemEsgotoInexistente: number;
    porcentagemEnergiaInexistente: number;
    porcentagemLixoRecicla: number;
    porcentagemLixoColetaPeriodica: number;
    porcentagemLaboratorioInformatica: number;
    porcentagemSalaAtendimentoEspecial: number;
    porcentagemLaboratorioCiencias: number;
    porcentagemBiblioteca: number;
    porcentagemSalaLeitura: number;
    porcentagemInternet: number;
    porcentagemBandaLarga: number;
}

// Modelo para estatísticas por estado
export interface IEstatisticasEscolas_Estado extends IEstatísticasEscolas{
    codigo: number;
    estado: string;
    uf: string;
}

// Modelo para estatísticas por cidade
export interface IEstatisticasEscolas_Cidade extends IEstatísticasEscolas{
    codigo: number;
    municipio: string;
    estado: string; 
    uf: string;
}

// Modelo para estatísticas com enem
export interface IEstatisticaEnem{
    mediaGeral: number;
    mediaCn: number;
    mediaCh: number;
    mediaMat: number;
    mediaRedacao: number;
}

// Modelo para estatísticas por escola
export interface IEstatisticaEnem_Escola extends IEstatisticaEnem{
    co_entidade: number;
    no_entidade: number;
    estado: string;
    uf: string;
    cidade: string;
}

// Modelo para estatísticas por cidade
export interface IEstatisticaEnem_Cidade extends IEstatisticaEnem{
    codigo: number;
    municipio: string;
    estado: string;
    uf: string;
}

// Modelo para estatísticas por estado
export interface IEstatisticaEnem_Estado extends IEstatisticaEnem{
    codigo: number;
    estado: string;
    uf: string;
}