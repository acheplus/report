import { useQuery } from 'react-query'
import { api } from '../../../services/apiClient'

type Resumo = {
    gestantes: {
        ubs: string;
        consultas: number;
        exames: number;
        odonto: number;
        total: number;
    }
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

    const resumo = {
        gestantes: gestantes,
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