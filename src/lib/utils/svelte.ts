export type ActionReturnType<TParam = any> = ActionReturnObject<TParam> | void

export interface ActionReturnObject<TParam = any>
{
	update?: (parameters: TParam) => void
	destroy?: () => void
}

export type Action<TParam = any> = (node: HTMLElement, param?: TParam) => ActionReturnType<TParam>
