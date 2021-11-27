import { useQuery } from 'react-query'
import { api } from '../../../services/apiClient'

type Crianca = {
    ubs: string;
    cns: string;
    cpf: string;
    nome: string;
    idade: number;
    vip: boolean;
    penta: boolean;
}

export async function getCriancas(): Promise<any> {
    const { data, headers } = await api.get('indicadores/5', {
        params: {
            // page,
        }
    })

    // const totalCount = Number(headers['x-total-count'])

    const criancas = data.criancas.map(crianca => {
        return {
            // id: crianca.id,
            ubs: crianca.no_unidade_saude,
            cns: crianca.nu_cns,
            cpf: crianca.nu_cpf_cidadao,
            nome: crianca.no_cidadao,
            idade: crianca.idade,
            vip: crianca.vip,
            penta: crianca.penta,
        }
    })
    return {
        criancas
    }
}

export function useVacinas() {
    return useQuery(['criancas'], () => getCriancas(), {
        staleTime: 1000 * 60 * 10,
    })
}