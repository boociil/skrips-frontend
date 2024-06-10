import { useNavigate } from "react-router-dom";

function ListBuble(props) {

    const navigate = useNavigate();
    // props : 
    // - pos -> Posisi (TOP/MID/BOT)
    // - item -> array yang berisi item
    // - title -> array yang berisi judul dari item yang ditampilkan
    // - small -> array yang berisi 0/1, yang melambangkan suatu title/item ditampilkan atau tidak jika dalam mode kecil
    // - column -> jika suatu itel/item menggunakan 2 kolom atau lebih
    // - click -> yang akan dilakukan jika di klick

 
    
    const pos = props.pos
    const total = props.item.length

    let col = 0


    let class_name = `cursor-pointer grid grid-rows-1 text-xs sm:text-sm grid-cols-${total}  hover:bg-slate-200 hover:rounded-lg hover:scale-105 transition duration-500 flex bg-white shadow-lg border-b-2 hover:border-slate-200 border-b-slate-300 max-w-5xl md:mx-auto `

    if (pos === 'TOP'){
        class_name += 'rounded-t-lg'
    }else if (pos === 'BOT'){
        class_name += 'rounded-b-lg'
    }  

    const generate_content = () => {
        const item = []
        for(let i=0;i<total;i++){

            item.push(
                <div className={`row-start-1 title px-3 py-2 w-fit ${props.small[i] === 1 ? ('') : ('hidden md:block ')}`}>
                    <div className="">{props.item[i]}</div>
                    <div className="block text-slate-400 text-xs">{props.title[i]}</div>
                </div>
            )
        }
        return item;
    }

    return (
        <div className={class_name} >
            {generate_content()}
        </div>
    )
}

export default ListBuble;