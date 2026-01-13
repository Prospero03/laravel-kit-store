export default function DeleteDialog({
    isOpen,
    onClose,
    onConfirm,
    title ,
    message ,
    confirmButtonText,
    cancelButtonText,
}:{
    isOpen: boolean,
    onClose: ()=>void,
    onConfirm: ()=>void,
    title : string,
    message : string,
    confirmButtonText : string,
    cancelButtonText : string,
    
}){
    return(
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black" aria-modal="true">
            <div className=" w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-medium text-gray-900">{title}</h3>
                <p className="mb-5 text-sm text-gray-600">{message}</p>
                <div className="flex items-center justify-end space-x-3">
                    <button className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 
                                     hover:bg-gray-300 
                                      focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
                            onClick={onClose}>
                        {cancelButtonText}
                    </button>
                    <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white 
                                     hover:bg-red-700 
                                       focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}>
                        {confirmButtonText}
                    </button>
                </div>
            </div>
        </div>
    )
}