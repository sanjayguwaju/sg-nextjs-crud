import EditTopicForm from "@/components/EditTopicForm";

const getTopicById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
            cache: "no-cache",
        });
    
        if(!res.ok) {
            throw new Error("Failed to fetch topic");
        }
        return res.json();
        
    } catch (error) {
        console.error(error);
    }
};

export default async function EditTopic({params}) {
    const {id} = params;
    const {topic} = await getTopicById(id);
    const {title, description} = topic;

    return (
        <div>
            <EditTopicForm id={id} title={title} description={description} />
        </div>
    )
}