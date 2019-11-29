import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core'
import { ImgCropperConfig, ImgCropperEvent } from '@alyle/ui/resizing-cropping-images'
import { LyTheme2 } from '@alyle/ui'

@Component({
  selector: 'ae-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageEditorComponent {

  @Input() width: number
  @Input() height: number
  @Input() resultWidth: number
  @Input() resultHeight: number

  @Output() aeOnResult = new EventEmitter<string>()

  classes = this.theme.addStyleSheet({
    cropping: {
      width: '100%',
      height: '500px',
    }
  })

  cropperConfig: ImgCropperConfig = {
    width: this.width,
    height: this.height,
    type: 'image/jpeg',
    output: {
      width: this.resultWidth,
      height: this.resultHeight
    }
  }

  constructor(private theme: LyTheme2) {}

  onCropped(e: ImgCropperEvent) {
    this.aeOnResult.emit(e.dataURL)
  }
}
