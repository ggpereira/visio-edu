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

// Modelo para medias enem
export interface IMediasEnem{
    mediaGeral: number;
    mediaCn: number;
    mediaCh: number;
    mediaMat: number;
    mediaRedacao: number;
}

// Modelo para  medias por escola
export interface IMediasEnem_Escola extends IMediasEnem{
    co_entidade: number;
    no_entidade: number;
    estado: string;
    uf: string;
    cidade: string;
}

// Modelo para medias por cidade
export interface IMediasEnem_Cidade extends IMediasEnem{
    codigo: number;
    municipio: string;
    estado: string;
    uf: string;
}

// Modelo para medias por estado
export interface IMediasEnem_Estado extends IMediasEnem{
    codigo: number;
    estado: string;
    uf: string;
}