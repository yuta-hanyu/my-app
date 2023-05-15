// import { AxiosResponse } from 'axios'
// import { axiosClient } from 'hooks/AxiosClientProvider'
// import { memo, FC, useEffect } from 'react'
// import React from 'react'

// const Home = memo(() => {
//   // const aaa = () =>
//   //   axiosClient.get(`login`).then(({ data }: AxiosResponse<any>) => {
//   //     console.log(data)
//   //   })
//   // useEffect(() => {
//   //   console.log(111)
//   //   axiosClient.get(`test`)
//   // }, [])
//   // axiosClient.get(`test`)
//   console.log(axiosClient.get(`test`))

//   return (
//     <div>
//       <h1>Home</h1>
//     </div>
//   )
// })

// export default Home

// import { axiosClient } from 'hooks/AxiosClientProvider'
import React from 'react'
import { useRecoilState } from 'recoil'
import { signInUserState } from 'store/auth'

const Home = () => {
  const [{ idToken }] = useRecoilState(signInUserState)

  // axiosClient.get(`test`).then((res: any) => {
  //   console.log(res)
  // })
  return <div>Home {idToken}</div>
}

export default Home
