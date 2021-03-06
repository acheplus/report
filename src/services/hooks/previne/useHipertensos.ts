import { useQuery } from 'react-query'
import { api } from '../../../services/apiClient'

type Hipertenso = {
    ubs: string;
    ine: number;
    cns: string;
    cpf: string;
    nome: string;
    nascimento: string;
    ok: boolean;
    obs: string;
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
            ine: Number(hipertenso.nu_ine),
            cns: hipertenso.nu_cns,
            cpf: hipertenso.nu_cpf,
            nome: hipertenso.no_cidadao,
            nascimento: new Date(hipertenso.dt_nascimento).toLocaleDateString('pt-BR', {
                timeZone: 'UTC'
            }),
            ok: hipertenso.pa,
            obs: hipertenso.obs,
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