<!-- src/routes/upload/+page.svelte -->
<script lang="ts">
    let base64String: string = "";
    let previewUrl: string = "";
  
    function handleImageUpload(event: Event): void {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;
  
      // Create preview
      previewUrl = URL.createObjectURL(file);
  
      // Convert to Base64
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          base64String = e.target.result.split(",")[1]; // Remove data:image/... prefix
        }
      };
      reader.readAsDataURL(file);
    }
  
    async function submitForm(): Promise<void> {
      try {
        const response = await fetch("/image", {
          method: "POST",
          body: JSON.stringify({ 
            image: base64String, 
            filename: "upload.jpg" 
          }),
          headers: { 
            "Content-Type": "application/json" 
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        alert(result.message);
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload failed. Please try again.");
      }
    }
</script>
  
<input 
  type="file" 
  accept="image/*" 
  on:change={handleImageUpload}
>
<button on:click={submitForm}>Upload</button>
  
{#if previewUrl}
  <img 
    src={previewUrl} 
    alt="Preview" 
    width="200"
    on:load={() => URL.revokeObjectURL(previewUrl)}
  >
{/if}