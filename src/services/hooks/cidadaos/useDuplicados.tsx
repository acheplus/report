import { useQuery } from 'react-query'
import { api } from '../../../services/apiClient'

type Duplicados = {
    ubs: string;
    ine: number;
    cns: string;
    cpf: string;
    nome: string;
    mae: string;
    nasc: string;
}

export async function getDuplicados(): Promise<any> {
    const { data, headers } = await api.get('cidadaos/duplicados', {
        params: {
            // page,
        }
    })

    // const totalCount = Number(headers['x-total-count'])

    const duplicados = data.duplicados.map(cidadao => {
        return {
            ubs: cidadao.ubs,
            ine: cidadao.ine,
            cns: cidadao.nu_cns,
            cpf: cidadao.nu_cpf,
            nome: cidadao.no_cidadao,
            mae: cidadao.no_mae,
            nasc: new Date(cidadao.dt_nascimento).toLocaleDateString('pt-BR', {
                timeZone: 'UTC'
            }),
        }
    })
    return {
        duplicados
    }
}

export function useDuplicados() {
    return useQuery(['duplicados'], () => getDuplicados(), {
        staleTime: 1000 * 60 * 10,
    })
}