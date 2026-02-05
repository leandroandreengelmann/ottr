'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export interface RideData {
    valor: number
    metodo_pagamento: string
    duracao_segundos: number
    distancia_metros?: number
    status_pagamento: string
    nome_passageiro?: string
    cpf_passageiro?: string
    telefone_passageiro?: string
    rota?: any
}

export async function recordRideAction(data: RideData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Usuário não autenticado' }
    }

    const { error } = await supabase
        .from('corridas')
        .insert({
            motorista_id: user.id,
            valor: data.valor,
            metodo_pagamento: data.metodo_pagamento,
            duracao_segundos: data.duracao_segundos,
            distancia_metros: data.distancia_metros,
            status_pagamento: data.status_pagamento,
            nome_passageiro: data.nome_passageiro,
            cpf_passageiro: data.cpf_passageiro,
            telefone_passageiro: data.telefone_passageiro,
            rota: data.rota
        })

    if (error) {
        console.error('Error recording ride:', error)
        return { error: 'Erro ao salvar o registro da corrida' }
    }

    revalidatePath('/financeiro')
    return { success: true }
}
