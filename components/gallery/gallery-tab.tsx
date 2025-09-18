import { Image as ImageType } from "@/types";
import { Tab } from "@headlessui/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect } from "react";

interface GalleryTabProps {
    image: ImageType;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
    useEffect(() => {
        // Debug: individual thumb
        console.log("[GalleryTab] thumb image:", image.id, image.url);
    }, [image]);
    return (
        <Tab className="relative flex aspect-square cursor-pointer
        items-center justify-center rounded-md bg-white">
        {({selected}) => (
            <div>
               <span className="absolute h-full w-full aspect-square
               inset-0 overflow-hidden rounded-md">
                <Image 
                fill
                src={image.url}
                alt=""
                className="object-cover object-center"
                />
                </span> 
                <span className={cn(
                    "absolute inset-0 rounded-md ring-2 ring-offset-2",
                    selected ? "ring-black" : "ring-transparent"
                )}/>
                {/* Debug: selection state */}
                <span className="hidden" aria-hidden>
                    {String(selected)}
                </span>
            </div>
        )}
        </Tab>
    );
}

export default GalleryTab;