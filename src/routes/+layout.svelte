<script>
    import { Modals, closeModal } from 'svelte-modals'
  </script>
  
  <Modals>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      slot="backdrop"
      class="backdrop"
      on:click={closeModal}
    />
  </Modals>
  
  <style>
    .backdrop {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: rgba(0,0,0,0.50)
    }
  </style>
<slot />
