export interface ILabelItem {
  background: string
  color: string
  icon?: string
  key: number
  text: string
}

export interface ILabelsRenderer {
  labels: Array<ILabelItem>
}
