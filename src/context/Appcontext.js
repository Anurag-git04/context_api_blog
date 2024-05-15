import { createContext, useState } from "react";
import {baseUrl} from '../baseUrl'
export const AppContext = createContext();

export default function AppContextProvider({children}){
    const [loading,SetLoading] = useState(false);
    const [posts,SetPosts] = useState([]);
    const [Page,SetPage]= useState(1);
    const[totalPages,SetTotalPages]=useState(null);

    //data filling
    
    async function fetchBlogPosts(page=1){
        SetLoading(true);
        let url = `${baseUrl}?page={page}`
        try{
            const result =await fetch(url); 
            const data = await result.json()
            console.log(data)
            SetPage(data.page)
            SetPosts(data.posts)
            SetTotalPages(data.totalPages)
        }
        catch(error){
            console.log("Error in fetching Data")
            SetPage(1)
            SetPosts([])
            SetTotalPages(null)
        }
        SetLoading(false) 
    }

    function handlePageChange(page){
        SetPage(page);
        fetchBlogPosts(page);
    }

    const value= {
        posts,
        SetPosts,
        loading,
        SetLoading,
        Page,
        SetPage,
        totalPages,
        SetTotalPages,
        fetchBlogPosts,
        handlePageChange
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}