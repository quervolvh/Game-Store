
export const change = (

  value: any,

  field: string,

  set: (e: any) => void

) => set((prevState : { [key: string] : any }) => ({ ...prevState, [field]: value }));

