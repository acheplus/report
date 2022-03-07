import { useQuery } from 'react-query'
import Diabeticos from '../../../pages/previne/indicador/diabeticos'
import { api } from '../../../services/apiClient'

type Resumo = {
    gestantes: [
        {
        ubs: string;
        consultas: number;
        exames: number;
        odonto: number;
        total: number;
    }],
    mulheres: [{
        ubs: string;
        ok: number;
        falta: number;
        total: number;
    }],
    criancas: [{
        ubs: string;
        ok: number;
        total: number;
    }],
    hipertensosok: Array<[string, any]>,
    hipertensos_total: Array<[string, any]>,
    diabeticos: Array<[string, any]>,
    populacao_ibge: number,
    cadastros_esus: number,
}

export async function getResumo(): Promise<any> {
    const { data, headers } = await api.get('indicadores/resumo', {
        params: {
            // page,
        }
    })

    const gestantes = data.gestantes.map(resumo => {
        return {
            ubs: resumo.UBS ? resumo.UBS : 'SEM VINCULO',
            consultas: resumo.consultas,
            exames: resumo.exames,
            odonto: resumo.odonto,
            total: resumo.total
        }
    })

    const mulheres = data.mulheres.map(mulher => {
        return {
            ubs: mulher.UBS ? mulher.UBS : 'SEM VINCULO',
            ok: mulher['Exames OK'],
            falta: mulher.Falta,
            total: mulher.total
        }
    })

    const criancas = data.criancas.map(crianca => {
        return {
            ubs: crianca.UBS ? crianca.UBS : 'SEM VINCULO',
            ok: crianca.ok,
            total: crianca.total
        }
    })

    const hipertensosok = data.hipertensos.map(hipertenso => {
        return [
            hipertenso.UBS ? hipertenso.UBS : 'SEM VINCULO',
            hipertenso.ok,
        ]
    })
    
    const hipertensos_total = data.hipertensos.map(hipertenso => {
        return [
            hipertenso.UBS ? hipertenso.UBS : 'SEM VINCULO',
            hipertenso.ok/hipertenso.total*100,
        ]
    })

    const diabeticos = data.diabeticos.map(diabetico => {
        return [
            diabetico.ubs ? diabetico.ubs : 'SEM VINCULO',
            diabetico.ok/diabetico.total*100,
        ]
    })

    const resumo: Resumo = {
        gestantes: gestantes,
        mulheres: mulheres,
        criancas: criancas,
        hipertensosok: [["UBS", "Qtd"], ...hipertensosok].slice(0,4),
        hipertensos_total: hipertensos_total.slice(0,4),
        diabeticos: diabeticos.slice(0,4),
        populacao_ibge: data.populacao_ibge,
        cadastros_esus: data.cadastros_esus
    }

    return {
        resumo
    }
}

export function useResumo() {
    return useQuery(['resumo'], () => getResumo(), {
        staleTime: 1000 * 60 * 10,
    })
}