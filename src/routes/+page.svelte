<script lang="ts">
   
   let guessNumber = $state(0)

   let balance = $state(1000);

   let win = $state<boolean | null>(null)

    let winningNumber = $state(0)

   const handleGuess = async () => {

    const handlePost = async () => {
        const res = await fetch("/lucky", {
            method: "POST"
        })

        const body = await res.json()

        winningNumber = body.data

        if(body.data === guessNumber) {
            balance += 1_000_000
            win = true
        } else {
            win = false
        }
    }

        win = null
     balance -= 100
     handlePost()
   }

    $effect(() => {

        const handleFetch = async() => {
            const res = await fetch("/lucky")

            const body = await res.json()

            console.log(body)
        }

        

        handleFetch()
    })
</script>

<div class="flex gap-y-4 flex-col min-h-screen items-center justify-center">
   <p class="text-3xl font-bold animate-bounce">Let's go gambling!!!</p>
    <div class="space-y-2">
        <p>Enter a number 1-100, make a correct guess and win $1,000,000 Dollars!</p>
        <p>Every guess cost $100</p>
        <input type="number" bind:value={guessNumber} class="w-full border h-10 rounded-md p-1">
        <div class="space-y-2">
            <p>Your remaining balance: ${balance}</p>
            <button 
            disabled={balance <= 0 || guessNumber < 1}
            onclick={handleGuess}
            class="h-8 rounded-sm cursor-pointer w-full border">
            {#if balance <= 0}
                You are broke
            {:else}
                Click me to start
            {/if}
            </button>
            {#if win === true}
                <p class="text-green-500">You guessed the right number! you won $1,000,000</p>
            {:else if win === false}
                <p class="text-red-500">You guessed the wrong number!</p>
                <p>The correct number is: {winningNumber}</p>
            {/if}
        </div>
    </div>
</div>