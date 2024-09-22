import { useEffect, useRef, useState } from "react";
import FetchingModal from './../common/FetchingModal';
import { deleteOne, getOne, putOne } from "../../api/productApi";
import { API_SERVER_HOST} from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

const initState = {
    pno:0,
    pname: '',
    pdesc: '',
    price: 0 ,
    delFlag: false,
    uploadFileNames : []
}

const host = API_SERVER_HOST

const ModifyComponent = ({pno}) => {
    const [result,setResult] = useState(null)
    
    const {moveToRead, moveToList} = useCustomMove()

    const [product,setProduct] = useState(initState)

    const [fetching, setFetching] = useState(false)

    const uploadRef = useRef()
    useEffect(() => {
        setFetching(true)

        getOne(pno).then(data => {
            setProduct(data)
            setFetching(false)
        })
    },[pno])

    const handleChangeProduct = (e) => {
        product[e.target.name]  = e.target.value

        setProduct({...product})
    }

    const delteOldImages = (imageName) => {
        const resultFileNames = product.uploadFileNames.filter(fileName => 
            fileName !== imageName
        )

        product.uploadFileNames = resultFileNames

        setProduct({...product})
    }

    const handleClickModify = () => {
        const files = uploadRef.current.files

        const formData = new FormData()

        for (let i= 0 ; i < files.length ; i++) {
            formData.append("files" , files[i])


        }

        formData.append("pname" , product.name)
        formData.append("pdesc" , product.pdesc)
        formData.append("price",product.price)
        formData.append("delFlag" , product.delFlag)

        for ( let i=0 ; i<product.uploadFileNames.length ; i++) {
            formData.append("uploadFileNames" , product.uploadFileNames)
        }   
        setFetching(true)
        putOne(pno,formData).then(data => {
            setResult('Modified')
            setFetching(false)
        })

        
    }

    const closeModal = () => {
        if(result === 'Modified') {
            moveToRead(pno)
        } else if ( result ==='Deleted') {
            moveToList({page:1})
        }
        setResult(null)
    }

    const handleClickDelete = () => {
        setFetching(true)
        deleteOne(pno).then(data => {
            setResult("Deleted")
            setFetching(false)
        }
        )
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
          
            {fetching ? <FetchingModal/> : <></>}
            {result ? <ResultModal title={`${result}`} content={'정상적으로 처리되었습니다.'} callbackFn={closeModal}></ResultModal> : <></>}
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Product Name</div>

                    <input type="text" className="w-4/5 p-6 rounded-r border border-solid border-neutral-300
                    shadow-md" name="pname" value={product.pname} onChange={handleChangeProduct}/>

                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                    <textarea name="pdesc" id="" className="w-4/5 p-6 rounded-r border border-solid border-neutral-300
                     shadow-md resize-y" rows="4" 
                     onChange={handleChangeProduct}
                     value={product.pdesc}></textarea>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input type="number" className="w-4/5 p-6 rounded-r border border-solid border-neutral-300
                    shadow-md" name="price" value={product.price} onChange={handleChangeProduct}/>

                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">DELETE</div>
                    <select name="delFlag" id="" value={product.delFlag}
                    onChange={handleChangeProduct}
                    className="w-4/5 p-6 rounded-r border border-solid border-neutral-300
                    shadow-md">
                        <option value={false}>사용</option>
                        <option value={true}>삭제</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    <input type="file" ref={uploadRef} className="w-4/5 p-6 rounded-r border 
                    border-solid border-neutral-300
                    " multiple={true} />
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Images</div>
                    <div className="w-4/5 justify-center flex flex-wrap items-start">
                    {product.uploadFileNames.map((imgFile, i) => 
                        <div className="flex justify-center flex-col w-1/3 m-1 align-baseline"
                        key={i}
                        >
                            <button className="bg-blue-500 text-3xl text-white" onClick={() => delteOldImages(imgFile)}>Delete</button>
                            <img src={`${host}/api/products/view/s_${imgFile}`} alt="img" />
                        </div>
                    )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500
                " onClick={handleClickDelete}>Delete</button>

                <button type="button" className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500"
                onClick={handleClickModify}>Modify</button>

                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                onClick={moveToList}>
                    List
                </button>
            </div>

        </div>
    )
}

export default ModifyComponent;