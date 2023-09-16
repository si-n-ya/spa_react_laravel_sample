import React, { createContext, useState, useContext, ReactNode } from "react"

type AuthContextProps = {
  isAuth: boolean
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextProps>({
  // 初期値設定
  isAuth: false,
  setIsAuth: () => {}
})


type AuthProviderProps = {
  children: ReactNode  // ここでchildrenの型を指定
}

export const AuthProvider = ({ children }: AuthProviderProps ) => {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
