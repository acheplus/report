import { useQuery } from 'react-query'
import { api } from '../../../services/apiClient'

type Gestante = {
    id?: string;
    ubs: string;
    cns: string;
    cpf: string;
    nome: string;
    dum: string;
    consultas: number;
    testes: boolean;
    odonto: boolean;
}

// type GetGestanteResponse = {
//     totalCount: number;
//     gestantes: Gestante[];
// }

export async function getGestantes(): Promise<any> {
    const { data, headers } = await api.get('indicadores/1', {
        params: {
            // page,
        }
    })

    // const totalCount = Number(headers['x-total-count'])

    const gestantes = data.gestantes.map(gestante => {
        return {
            // id: gestante.id,
            ubs: gestante.no_unidade_saude,
            cns: gestante.nu_cns,
            cpf: gestante.nu_cpf_cidadao,
            nome: gestante.no_cidadao,
            dum: new Date(gestante.dt_inicio_gestacao).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }),
            consultas: gestante.consultas,
            testes: gestante.citopatologico,
            odonto: gestante.odonto,
        }
    })
    return {
        gestantes
    }
}

export function useGestantes() {
    return useQuery(['gestantes'], () => getGestantes(), {
        staleTime: 1000 * 60 * 10,
    })
}