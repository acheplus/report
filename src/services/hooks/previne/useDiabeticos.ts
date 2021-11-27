import { useQuery } from 'react-query'
import { api } from '../../../services/apiClient'

type Diabetico = {
    ubs: string;
    cns: string;
    cpf: string;
    nome: string;
    ok: boolean;
}

export async function getDiabeticos(): Promise<any> {
    const { data, headers } = await api.get('indicadores/7', {
        params: {
            // page,
        }
    })

    // const totalCount = Number(headers['x-total-count'])

    const diabeticos = data.diabeticos.map(diabetico => {
        return {
            // id: diabetico.id,
            ubs: diabetico.no_unidade_saude,
            cns: diabetico.nu_cns,
            cpf: diabetico.nu_cpf_cidadao,
            nome: diabetico.no_cidadao,
            ok: diabetico.pa,
        }
    })
    return {
        diabeticos
    }
}

export function useDiabeticos() {
    return useQuery(['diabeticos'], () => getDiabeticos(), {
        staleTime: 1000 * 60 * 10,
    })
}