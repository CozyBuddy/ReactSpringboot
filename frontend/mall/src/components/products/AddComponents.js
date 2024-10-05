import { useRef, useState } from "react";

import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAdd } from './../../api/productApi';


const initState = {
    pname : '',
    pdesc: '',
    price: 0 ,
    files: []
}

const AddComponent = () => {

    const [product,setProduct] = useState({...initState})

    const uploadRef = useRef();
   
    const {moveToList} = useCustomMove()

    
    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value
        setProduct({...product})
    }
    const addMutation = useMutation({
        mutationFn: (product) => postAdd(product)
    });
    

    const handleClickAdd = (e) => {
       
        const files = uploadRef.current.files
        
        const formData = new FormData()

        for (let i = 0; i < files.length; i++) {
            formData.append("files" ,files[i])
            
        }

        //other data
        formData.append("pname" , product.pname)

        formData.append("pdesc" ,product.pdesc)
        formData.append("price" , product.price)

        addMutation.mutate(formData)

    }
    const queryClient = useQueryClient()
    const closeModal = () => {
        queryClient.invalidateQueries("product/list")
        moveToList({page:1})
    }
    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {addMutation.isLoading ? <FetchingModal></FetchingModal> : <></>}
            {addMutation.isSuccess ? <ResultModal title={'Add Result'} content={`Add Success ${addMutation.data.result}`} 
            callbackFn={closeModal}></ResultModal> : <></>}
            <div className="flex justify-center">
               <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
                <input type="text" className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                name="pname" 
                value={product.pname} 
                onChange={handleChangeProduct}/>
               </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                    <textarea className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                     name="pdesc" 
                     rows="4"
                     onChange={handleChangeProduct}
                     value={product.pdesc}
                     >{product.pdesc}</textarea>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md "
                     name="price" 
                     type={'number'}
                     onChange={handleChangeProduct}
                     value={product.price}
                     ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md "
                     ref={uploadRef}
                     type="file"
                     multiple={true}
                    
                     ></input>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button type="button" className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
                    onClick={handleClickAdd}>ADD</button>
                </div>
            </div>
        </div>
    )
}

export default AddComponent;