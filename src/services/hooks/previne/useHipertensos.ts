import { useQuery } from 'react-query'
import { api } from '../../../services/apiClient'

type Hipertenso = {
    ubs: string;
    cns: string;
    cpf: string;
    nome: string;
    ok: boolean;
}

export async function getHipertensos(): Promise<any> {
    const { data, headers } = await api.get('indicadores/6', {
        params: {
            // page,
        }
    })

    // const totalCount = Number(headers['x-total-count'])

    const hipertensos = data.hipertensos.map(hipertenso => {
        return {
            // id: hipertenso.id,
            ubs: hipertenso.no_unidade_saude,
            cns: hipertenso.nu_cns,
            cpf: hipertenso.nu_cpf_cidadao,
            nome: hipertenso.no_cidadao,
            ok: hipertenso.pa,
        }
    })
    return {
        hipertensos
    }
}

export function useHipertensos() {
    return useQuery(['hipertensos'], () => getHipertensos(), {
        staleTime: 1000 * 60 * 10,
    })
}