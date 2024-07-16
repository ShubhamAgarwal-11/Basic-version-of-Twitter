import { TiDeleteOutline } from "react-icons/ti";
import { RiDeleteBin5Fill } from "react-icons/ri";

const DeleteTweetpopUp = ({deleteTweet,onClose})=>{

    return(
        <div className="flex justify-center items-center text-white fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="mt-10 flex flex-col gap-5 text-white">
                <div onClick={onClose} className="place-self-end">
                    <TiDeleteOutline size={'30px'}/>
                </div>
                <div className="bg-[#374151] rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <p className="text-lg">Are you sure you want to delete this Tweet?</p>
                    <div className="flex gap-8">
                        <button onClick={deleteTweet} className="flex items-center bg-red-600 hover:bg-red-800 px-4 py-2 rounded-xl"> <RiDeleteBin5Fill/>Delete</button>
                        <button onClick={onClose} className="bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded-xl">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default DeleteTweetpopUp;