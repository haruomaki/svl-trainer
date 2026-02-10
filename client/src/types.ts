export type Scene = "title" | "mondai"

export type SceneSetter = React.Dispatch<
  React.SetStateAction<Scene>
>

export type SceneProps = {
  setScene: SceneSetter
}
