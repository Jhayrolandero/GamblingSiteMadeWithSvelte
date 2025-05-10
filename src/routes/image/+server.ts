import ollama from 'ollama';

export const POST = async ({ request }: { request: Request }) => {
    try {
        const { image } = await request.json();

        const response = await ollama.chat({
            model: 'llava:latest',
            messages: [{
                role: 'user',
                content: 'Create a story about the image',
                images: [image]
            }]
        });

        console.log("Response from Ollama:", response);

        return new Response(JSON.stringify(response.message.content), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error("Error in POST request:", error);
        return new Response(JSON.stringify({ error: 'Failed to process image' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};