export const GET = async () => {

    return new Response(JSON.stringify({ data: "Hello" }), {
        headers: { 'Content-Type': 'application/json' }
    });
};

export const POST = async () => {
    
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    
    return new Response(JSON.stringify({ data: randomNumber }), {
        headers: { 'Content-Type': 'application/json' }
    });
}