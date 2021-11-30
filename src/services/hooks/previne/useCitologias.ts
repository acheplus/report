import { useQuery } from 'react-query'
import { api } from '../../../services/apiClient'

type Mulher = {
    ubs: string;
    cns: string;
    ine: number;
    cpf: string;
    nome: string;
    idade: number;
    ok: boolean;
}

export async function getMulheres(): Promise<any> {
    const { data, headers } = await api.get('indicadores/4', {
        params: {
            // page,
        }
    })

    // const totalCount = Number(headers['x-total-count'])

    const mulheres = data.mulheres.map(mulher => {
        return {
            // id: mulher.id,
            ubs: mulher.no_unidade_saude,
            ine: Number(mulher.nu_ine),
            cns: mulher.nu_cns,
            cpf: mulher.nu_cpf_cidadao,
            nome: mulher.no_cidadao,
            idade: Number(mulher.idade),
            ok: mulher.tem,
        }
    })
    return {
        mulheres
    }
}

export function useCitologias() {
    return useQuery(['mulheres'], () => getMulheres(), {
        staleTime: 1000 * 60 * 10,
    })
}