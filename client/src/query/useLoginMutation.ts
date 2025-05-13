import { kyInstance } from '@/lib/kyInstance'
import useLoginStore from '@/store/useLoginStore'
import { useMutation } from '@tanstack/react-query'



function useLoginMutation() {
  const { setToken } = useLoginStore();
  return (
    useMutation({
      mutationKey: ['login'],
      mutationFn: async ({ email, password }: { email: string, password: string }) => {
        const response = await kyInstance.post('auth/login', { json: { email, password } })
        return await response.json() as { token: string }
      }, onSuccess: (data) => { setToken(data.token) }
    })
  )
}

export default useLoginMutation