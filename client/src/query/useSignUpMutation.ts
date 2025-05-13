import { kyInstance } from '@/lib/kyInstance'
import { useMutation } from '@tanstack/react-query'

function useSignUpMutation() {
  return (
    useMutation({
      mutationKey: ['signup'],
      mutationFn: async ({ email, password, username, nickname }: { email: string, password: string, username: string, nickname: string }) => {
        const response = await kyInstance.post('auth/register', { json: { email, password, username, nickname } })
        return response.body
      }
    })
  )
}

export default useSignUpMutation