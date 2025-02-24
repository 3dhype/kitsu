<template>
<div :class="{
  'modal': true,
  'is-active': active
}">
  <div class="modal-background" @click="$emit('cancel')" ></div>

  <div class="modal-content">
    <div class="box content">
      <h1 class="title">
        {{ $t("tasks.comment_image") }}
      </h1>

      <p>
        {{ $t("tasks.select_file") }}
      </p>

      <file-upload
        ref="image-field"
        :label="$t('main.csv.upload_file')"
        :accept="extensions"
        @fileselected="onFileSelected"
        :multiple="true"
      />

      <p class="error" v-if="isError">
        {{ $t("tasks.add_preview_error") }}
      </p>

      <p class="has-text-right">
        <a
          :class="{
            button: true,
            'is-primary': true,
            'is-loading': isLoading,
            'is-disabled': forms == undefined
          }"
          @click="confirm()">
          {{ $t("main.confirmation") }}
        </a>
        <button
          @click="$emit('cancel')"
          class="button is-link">
          {{ $t("main.cancel") }}
        </button>
      </p>

      <p class="upload-previews" v-if="forms">
        <template v-for="(form, i) in forms">
          <hr :key="'separator-' + i"/>
          <img
            alt="uploaded file"
            :src="getURL(form)"
            :key="i"
            v-if="isImage(form)"
          >
          <video
            class="is-fullwidth"
            preload="auto"
            controls
            loop
            muted
            :src="getURL(form)"
            :key="i"
            v-else-if="isVideo(form)"
          />
          <iframe
            class="is-fullwidth"
            frameborder="0"
            :src="getURL(form)"
            :key="i"
            v-else
          />
        </template>
      </p>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { modalMixin } from '@/components/modals/base_modal'
import files from '@/lib/files'
import FileUpload from '@/components/widgets/FileUpload.vue'

export default {
  name: 'add-preview-modal',
  mixins: [modalMixin],

  components: {
    FileUpload
  },

  props: {
    active: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isError: {
      type: Boolean,
      default: false
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    extensions: {
      type: String,
      default: files.ALL_EXTENSIONS_STRING
    }
  },

  data () {
    return {
      forms: null
    }
  },

  computed: {
    ...mapGetters([
    ]),

    imageField () {
      return this.$refs['image-field']
    }
  },

  methods: {
    ...mapActions([
    ]),

    onFileSelected (forms) {
      this.forms = forms
    },

    confirm () {
      this.$emit('confirm', this.forms)
    },

    reset () {
      this.imageField.reset()
      this.forms = null
    },

    onPaste (event) {
      this.imageField.filesChange('', event.clipboardData.files)
    },

    getURL (form) {
      return window.URL.createObjectURL(form.get('file'))
    },

    isImage (form) {
      return form.get('file').type.startsWith('image')
    },

    isVideo (form) {
      return form.get('file').type.startsWith('video')
    }
  },

  watch: {
    active () {
      this.reset()
    }
  },

  mounted () {
    this.forms = null
    window.addEventListener('paste', this.onPaste, false)
  },

  beforeDestroy () {
    window.removeEventListener('paste', this.onPaste)
  }
}
</script>

<style lang="scss" scoped>
.modal-content {
  max-height: calc(100vh - 150px);
}

.modal-content .box p.text {
  margin-bottom: 1em;
}

.error {
  margin-top: 1em;
}

.description {
  margin-bottom: 1em;
}

.is-fullwidth {
  width: 100%;
}

.upload-previews {
  text-align: center;
}
</style>
