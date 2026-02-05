'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signInAction(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    return redirect('/home')
}

export async function signUpAction(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const nome = formData.get('nome') as string
    const cpf = formData.get('cpf') as string
    const telefone = formData.get('telefone') as string
    const modeloVeiculo = formData.get('modeloVeiculo') as string
    const placaVeiculo = formData.get('placaVeiculo') as string

    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                nome,
                cpf,
                telefone,
                modelo_veiculo: modeloVeiculo,
                placa_veiculo: placaVeiculo,
            },
        },
    })

    if (error) {
        return { error: error.message }
    }

    // Com Supabase Auth, o redirecionamento após o cadastro depende se 
    // a confirmação de e-mail está ativada. Assumimos redirecionamento para o login
    // ou home se o auto-confirm estiver on.
    return { success: true }
}

export async function signOutAction() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    return redirect('/login')
}
