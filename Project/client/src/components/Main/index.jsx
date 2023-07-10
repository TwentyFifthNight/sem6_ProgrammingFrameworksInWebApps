import styles from "./styles.module.css"
import axios from "axios"
import AccountDetails from "./AccountDetails"
import GameDetails from "./GameDetails"
import GamesTable from "./Table"
import ErrorMessage from "./ErrorMessage"
import Navigation from "./Navigation"
import Favorites from "./Favorites"
import { useState } from "react"
import PulseLoader from "react-spinners/PulseLoader";


const Main = () => {
    const [loading, setLoading] = useState(false)
    const [games, setGames] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",  
        email: ""
    })
    const [favorites, setFavorites] = useState([])
    const [page, setPage] = useState(1)
    const [gameDetails, setGameDetails] = useState({
        appid: -1,
        name: "",
        price: "",
        initialPrice: "",
        discount: "",
        description: "",
        header_image: "",
        isFavorite: false
    })
    const [isClick, setClick] = useState(false);

    const eraseStates = () => {
        setGames([])
        setErrorMessage("")
        setUserDetails({
            firstName: "",
            lastName: "",  
            email: ""
        })
        setGameDetails({
            appid: -1,
            name: "",
            price: "",
            initialPrice: "",
            discount: "",
            description: "",
            header_image: "",
            isFavorite: false
        })
        setClick(false)
        setFavorites([])
    } 

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    const request = async (method, url, params) => {
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const config = {
                    method: method,
                    url: url,
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token },
                    params: params
                }
                const { data: res } = await axios(config)
                if(res.data)
                    return res.data
            } catch (error) {
                catchRequestError(error)
            }
            return true
        }
        setLoading(false)
        window.location.reload()
        return false
    }

    const catchRequestError = (error) => {
        setLoading(false)
        if(!error)
            return
        if (!error.response)
            return
        
        if(error.response.status === 404 || error.response.status === 500){
            setErrorMessage(error.response.data.message)
        }
        else if (error.response.status >= 400 && error.response.status < 500){
            localStorage.removeItem("token")
            window.location.reload()
            setLoading(false)
        }
    }

    const handleAccountDetails= async (e) => {
        setLoading(true)
        const data = await request("get", "http://localhost:8080/api/user")
        if(!data)
            return

        eraseStates()
        setUserDetails(data)
        setLoading(false)
    }

    const handleDelete = async () => {
        setLoading(true)
        await request("delete", "http://localhost:8080/api/user")
        eraseStates()
        localStorage.removeItem("token")
        setLoading(false)
        window.location.reload()
    }
    
    const handleGetGames = async (pageNumber) => {
        setLoading(true)
        const data = await request("get", "http://localhost:8080/api/games", {page: pageNumber})
        if(!data)
            return
        
        eraseStates()
        setPage(pageNumber)
        setGames(data)
        setLoading(false)
    }
    

    const handleGameDetail = async (e) => {
        setLoading(true)
        const data = await request("get", "http://localhost:8080/api/game", {appid: e})
        if(!data)
            return
        
        eraseStates()
        setGameDetails(data)
        setClick(data.isFavorite)
        setLoading(false)
    }
       
    const handleFavorites = async () => {
        setLoading(true)
        const data = await request("get", "http://localhost:8080/api/favorites")
        if(!data)
            return

        eraseStates()
        setFavorites(data)
        setLoading(false)
    }

    
    const handleLike = async (appid, name) => {
        const token = localStorage.getItem("token")
        if (!token) 
            window.location.reload()

        try {
            const config = {
                method: 'patch',
                url: 'http://localhost:8080/api/game',
                headers: { 'Content-Type': 'application/json', 'x-access-token': token },
                data: {appid: appid, name: name}
            }
            const { data: res } = await axios(config)
            setErrorMessage("")
            setClick(res.data)
        } catch (error) {
            catchRequestError()
        }
    }

    const pageChanged = (value) => {
        if(value < 1)
            return
        handleGetGames(value)
    }

    const handleOrderButton = async (index1, index2) => {
        if(index2 >= favorites.length || index1 < 0)
            return
        
        const token = localStorage.getItem("token")
        if (!token) 
            window.location.reload()

        try {
            const config = {
                method: 'patch',
                url: 'http://localhost:8080/api/favorites',
                headers: { 'Content-Type': 'application/json', 'x-access-token': token },
                data: {index1: index1, index2: index2}
            }

            await axios(config)
            setErrorMessage("")
            await handleFavorites()
        } catch (error) {
            catchRequestError()
        }
    }

    return (
        <div className={styles.main_container}>
            <Navigation getGames={handleGetGames} favorite={handleFavorites} 
                description={handleAccountDetails} logout={handleLogout} page={page}/>

            {errorMessage !== "" ? <ErrorMessage message={errorMessage}/> : <></>}
            <PulseLoader className={styles.loading} loading={loading} size={20} color={"black"}/>
            {games.length > 0 ? <GamesTable data={games} page={page} setPage={pageChanged} rowClick={handleGameDetail}/> : <></>}
            {gameDetails.appid !== -1 ? <GameDetails details={gameDetails} handleLike={handleLike} isClick={isClick}/> : <></>}
            {favorites.length > 0 ? <Favorites data={favorites} rowClick={handleGameDetail} handleOrderButton={handleOrderButton}/> : <></>}
            {userDetails.firstName !== "" ? <AccountDetails user={userDetails} handleDelete={handleDelete}/> : <></>}
        </div>
        
    )
}
export default Main