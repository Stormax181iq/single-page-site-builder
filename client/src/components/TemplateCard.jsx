import ActionButton from "./ActionButton";

export default function TemplateCard({}) {
    return <div className="group relative w-64 rounded-xl">
        <img className="rounded-xl z-0" src="https://picsum.photos/1400/1200"/>
        <div className="rounded-xl absolute flex justify-center items-center p-1 top-0 z-1 w-full h-full">
            <div className="absolute rounded-xl top-0 w-full h-full group-hover:bg-black opacity-25"></div>
            <ActionButton className="z-2 hidden group-hover:block w-32">SELECT</ActionButton>
        </div>
    </div>
}