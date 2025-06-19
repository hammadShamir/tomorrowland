import React from 'react'

interface numProp {
    num: string | number,
    unit: string,
    flip: boolean,
};

export const NumberBox = ({ num, unit }: numProp) => {
    return (
        <div className="flex flex-col items-center px-2 ">
            <div className=" relative bg-transparent flex flex-col items-center justify-center rounded-lg w-10 h-10 md:w-20 md:h-20 text-2xl md:text-4xl ">
                <div className="rounded-t-lg rounded-b-lg  w-full h-full"></div>

                <div className="text-2xl absolute text-white text-shadow z-10 font-bold font-redhat md:text-5xl font-mono ">
                    {num}
                </div>

                <div className=" rounded-b-lg rounded-t-lg  w-full h-full"></div>

            </div>
            <p className="text-lg font-semibold text-white  md:text-2xl font-[family-name:var(--font-secondary)]">
                {unit}
            </p>
        </div>
    )
}