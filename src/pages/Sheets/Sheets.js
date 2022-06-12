import React , { useEffect , useState } from "react"; 
import ListComponent from "../../components/List";
import { useSelector, useDispatch } from 'react-redux';
import { fetchSheets } from "../../store/slices/sheets";

export default function SheetIndex() {

    const dispatch = useDispatch();
    useEffect(()=>{
        !sheets && dispatch(fetchSheets())
    },[])

    const { sheets } = useSelector(state => state.sheets)

    return(
        <div>

            <ListComponent type={'sheets'} list={ sheets } />

        </div>
    );
};