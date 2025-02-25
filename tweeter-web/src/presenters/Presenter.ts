
export interface View {
    displayErrorMessage: (message: string) => void
}

export interface MessageView extends View{
    displayInfoMessage: (message: string,
                         duration: number,
                         bootstrapClasses?: string
    ) => void,
    clearLastInfoMessage: () => void
}

export class Presenter<T extends View> {
    private _view: T

    protected constructor(view: T){
        this._view = view;
    }

    protected get view(){
        return this._view;
    }

    public async doFailureReportingOperation(operationDescription: string, operation: () => Promise<void>){
        try {
            await operation();
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to ${operationDescription} because of exception: ${(error as Error).message}`
            );
        }
    };


}

