"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function addTopic() {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");

    const router = useRouter();

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title || !description) {
            return;
            alert("Title and Description are required");
        }

        try {
            const res = await fetch(`http://localhost:3000/api/topics`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({title, description}),
            });
            if (!res.ok) {
                throw new Error("Failed to create topic");
            }
            if (res.ok) {
                router.refresh();
                router.push("/");
            }
        } catch (error) {
            console.log("Error creating topic", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="border border-slate-500 px-8 py-2" 
                type="text"
                placeholder="Topic Title"
            />
            <input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="border border-slate-500 px-8 py-2" 
                type="text"
                placeholder="Topic Title"
            />

            <button 
                type="submit"
                className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
            >
                Add Topic
            </button>
        </form>
    )
}