import { useQuery } from 'react-query'
import { api } from '../../../services/apiClient'

type Diabetico = {
    ubs: string;
    ine: number;
    cns: string;
    cpf: string;
    nascimento: string;
    nome: string;
    ok: boolean;
    obs: string;
}

export async function getDiabeticos(): Promise<any> {
    const { data, headers } = await api.get('indicadores/7', {
        params: {
            // page,
        }
    })

    // const totalCount = Number(headers['x-total-count'])

    const diabeticos: Array<Diabetico> = data.diabeticos.map(diabetico => {
        return {
            // id: diabetico.id,
            ubs: String(diabetico.no_unidade_saude),
            ine: Number(diabetico.nu_ine),
            cns: String(diabetico.nu_cns),
            cpf: diabetico.nu_cpf ? String(diabetico.nu_cpf) : "",
            nome: String(diabetico.no_cidadao),
            nascimento: new Date(diabetico.dt_nascimento).toLocaleDateString('pt-BR', {
                timeZone: 'UTC'
            }),
            ok: Boolean(diabetico.pa),
            obs: String(diabetico.obs),
        }
    })
    console.log(diabeticos)
    return {
        diabeticos
    }
}

export function useDiabeticos() {
    return useQuery(['diabeticos'], () => getDiabeticos(), {
        staleTime: 1000 * 60 * 10,
    })
}