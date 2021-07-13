import React, { useEffect } from 'react'
import styled from 'styled-components'
import { auth, provider } from '../firebase'
import { useHistory } from 'react-router-dom'
import {
  selectUserName,
  selectUserPhoto,
  setSignOut,
  setUserLogin,
} from "../features/user/userSlice"
import { useDispatch, useSelector } from "react-redux"

function Header() {
  const dispatch = useDispatch()
  const history = useHistory()
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() =>{
      auth.onAuthStateChanged(async (user) =>{
        if(user){
          dispatch(setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
          }))
          history.push("/")
        }
      })
  }, []) 

  const signIn = () => {
      auth.signInWithPopup(provider)
      .then((result)=> {
          let user = result.user
          dispatch(setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
          }))
          history.push('/')
      })
  }
  
  const signOut  = () => {
    auth.signOut()
    .then(() => {
      dispatch(setSignOut());
      history.push("/login")
    })
  }
    return (
           <Nav>
             <Logo src="/images/logo.svg" />
             {!userName ? (
               <LoginConatiner >
                  <Login onClick={signIn}>Login</Login>
               </LoginConatiner>
                ):
               <>
                 <NavMenu>
                      <a>
                          <img src="/images/home-icon.svg" />
                          <span>HOME</span>
                      </a>
                      <a>
                          <img src="/images/search-icon.svg" />
                          <span>SEARCH</span>
                      </a>
                      <a>
                          <img src="/images/watchlist-icon.svg" />
                          <span>WATCHLIST</span>
                      </a>
                      <a>
                          <img src="/images/original-icon.svg" />
                          <span>ORIGINALS</span>
                      </a>
                      <a>
                          <img src="/images/movie-icon.svg" />
                          <span>MOVIES</span>
                      </a>
                      <a>
                          <img src="/images/series-icon.svg" />
                          <span>SERIES</span>
                      </a>
               </NavMenu>
              <UserImg 
              onClick={signOut} 
              src="https://lh3.googleusercontent.com/-jdlp8iPmHbc/X8huwTEqhiI/AAAAAAAAFcI/jrbud2l7Ly4DqMRO8iNwP8ad1J6X3jC3QCEwYBhgLKtMDABHVOhyL5TyVyL-iP442JxLbhyu6nrirxQCObrhXMkA7rSMPblFmmRMUhA9LfQ3qZDfm7CLA4bo5UyGhwXhJ3I4j-WgPddJ7NJ1fC5YNvc9ZBeXv0xiIspUBf4XWYiVInocGlzOiwlyXT1aC6fjSFGEyTK15emUDY2Ta-xU0drR2uXD9U1nJpC9g43zSaGct7nMzdGRhX_30hBRRpZBtEcNdNQlpp1jrMd5ErHfTOR4-FqTQuOIEjAkpvm1R9liqE7mMAhaeT0SC8drc2vkDjbe-x1zosF-BSofUtxYwlnAkab6SkgQdCJveG41WRJkU0lRC70ZLAsMs92iloiR_UOW3IbBB77GLlVeNJKYt6OIaAuBH1b2dR1dqI7Ix3xvehOKy5s4Ncx5k5w9U_HaaBhoTjv0zNMAGcAvGAL6N7zVmQRpkBrwi-Ux5j-NDCDhkQeiAOUDQMzYSuw7pPwWfbyqy3m2geiDjyDLPUK8snlfHLT4dIanv66mRK-2lWZDDbmDp158G2photVUe7R91QdVboqTimqAlQFeHgdRPWZVRbilyIed_XkHjlyA33WWA12eJIpfje9l1cyp9wwu2pdEErNwzwqIXv4MH4EQp-NvJ2yswpKPdhgY/w140-h139-p/Levi_Ackermann_%2528Anime%2529_character_image.png" />
             </>
             }
             
           </Nav>
    )
}

export default Header


const Nav = styled.nav`
   height: 70px;
   background: #090b13;
   display: flex;
   align-items: center;
   padding: 0 36px;
   overflow-x: hidden;
`

const Logo = styled.img`
  width: 80px;
`

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 20px;
  align-items: center;

  a{
      display: flex;
      align-items: center;
      padding: 0 12px;
      cursor: pointer;

      img{
           height: 20px;
      }

      span{
          font-size: 13px;
          letter-spacing: 1.42px;
          position: relative;

          &:after {
            content: "";
            height: 2px;
            background: white;
            position: absolute;
            left: 0;
            right: 0;
            bottom: -6px;
            opacity: 0;
            transform-origin: left center;
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94  ) 0s;
            transform: ScaleX(0) ;
          }
      }

      &:hover {
        span:after {
          transform: ScaleX(1);
          opacity: 1;
        }
      }
  }
`

const UserImg = styled.img`
 width:48px;
 height:48px;
 border-radius: 50%;
 cursor:pointer;
`

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
   border-radius: 4px;
   letter-spacing: 1.5px;
   text-transform: uppercase;
   background-color: #rgba(0, 0, 0, 0.6);
   cursor: pointer;

   &:hover {
     background-color: #f9f9f9;
     color: #000000;
     border-color: transparent;
   }
`
const LoginConatiner = styled.div`
  flex:1;
  display:flex;
  justify-content: flex-end;
`
