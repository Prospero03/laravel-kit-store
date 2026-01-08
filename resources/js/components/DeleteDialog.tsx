export default function DeleteDialog ({
    idOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmButtonText,
    cancelButtonText,
}:{
    idOpen:string,
    onClose:()=>void,
    onConfirm:()=>void,
    title:string,
    message:string,
    confirmButtonText:string,
    cancelButtonText:string,
}){
    return(
        <div>
            <div>
                <h3>{title}</h3>
                <p>{message}</p>
            </div>
            <div>
                <button onClick={onClose}>{cancelButtonText}</button>
                <button onClick={onConfirm}>{confirmButtonText}</button>
            </div>
        </div>
    )
}