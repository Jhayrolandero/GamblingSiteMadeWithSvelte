<script lang="ts">
    import Try from "../component/try.svelte";
    let count = $state(0)

    let objj = $state({
        name: 'John Doe',
        age: 30,
        address: {
            city: 'New York',
            state: 'NY'
        }
    })
    let arr = $state([1, 2, 3])

    let race = $state<"Black" | "White" | "Yellow">("Black")

    $effect(() => {
        console.log("State changed: ", count)
    })
</script>

<div class="flex flex-col min-h-screen items-center justify-center">
    Counter: {count}
    <button onclick={() => count += 1} >
        Increment
    </button>
    <button onclick={() => count -= 1} >
        Decrement
    </button>
    {
        objj.name
    }

    <input type="text" bind:value={objj.name} />

    {#if  race === "Black"}
        <p>You're {race}</p>
    {:else if race === "Yellow"}
        <p>You're {race}</p>
    {:else}
        <p>America rahhhh</p>
    {/if}
    {#each arr as item}
    <p>{item}</p>
    {/each}

    <Try
    name={objj.name}
    />
</div>