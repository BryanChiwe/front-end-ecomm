<svelte:head>
  <script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<script>
    import { uploadMedia } from '../../../utils/s3-uploader.js';
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    let formErrors = {};

    function PostImageUpload() {
      goto ('/')
    }
//fields needed. userID (to get from the backend) title, price, description, imageURL (to get this from AWS after the user pull the image)
    async function uploadImage(evt) {
      const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);
      // code to make POST request to your backend

      const imageData = {
        title: evt.target['title'].value,
        price: evt.target['price'].value,
        description: evt.target['description'].value,
        namefile: fileName,
        imageURL: fileUrl
      }

      const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/images', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(imageData)
      })
    }


</script>

  <form on:submit|preventDefault={uploadImage} class="w-1/3">
    <div class="form-control w-full mt-2">
      <input type="file" name="file" />
      {#if 'file' in formErrors}
        <label class="label" for="file">
          <span class="label-text-alt text-red-500">{formErrors['file']}</span>
        </label>
      {/if}
    </div>
    <div class="form-control w-full mt-4">
      <button class="btn btn-md" on:click={PostImageUpload}>Upload</button>
    </div>
  </form>