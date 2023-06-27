<script>
    import "../app.css";
    import {LoggedInState, logOut} from '../utils/auth.js'
    import { goto } from '$app/navigation';

    function UploadImage() {
      goto ('/image/upload')
    }

    function HomePage() {
      goto ('/')
    }

</script>

<nav class='navbar'>
    <div class="container mx-auto flex-row justify-content space-between">
      <button class="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded ml-3" on:click|preventDefault={HomePage}>Home</button>
    </div>
      <div class="container mx-auto display flex-row-reverse justify-content: space-between">
      {#if $LoggedInState}
        <button class="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded ml-3" on:click={logOut}>
          Logout
        </button>
        <button class="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded ml-3" on:click={UploadImage}>
          Upload Image
        </button>
        {:else}
        <button class="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded ml-3" on:click={() => {window.location.href = '/login'}}>Login</button>
      {/if}
  <!-- hide button when logged in -->
      <!-- <button class="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded ml-3" on:click={() => {window.location.href = '/jobs/new'}}>
        Post A Job
      </button> -->
    </div>
</nav>

  <slot/>