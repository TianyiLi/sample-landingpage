type Constructor<T> = new (...args: any[]) => T
export function handleJsonApiError<T extends Constructor<object>>(target: T) {
  function getMethodDescriptor(
    propertyName: string
  ): TypedPropertyDescriptor<any> {
    if (target.prototype.hasOwnProperty(propertyName))
      return Object.getOwnPropertyDescriptor(
        target.prototype,
        propertyName
      ) as TypedPropertyDescriptor<any>

    // create a new property descriptor for the base class' method
    return {
      configurable: true,
      enumerable: true,
      writable: true,
      value: target[propertyName],
    }
  }
  Object.getOwnPropertyNames(target).forEach(propertyName => {
    const propertyValue = target[propertyName] as Function
    const isMethod = propertyValue instanceof Function
    if (!isMethod) return

    const descriptor = getMethodDescriptor(propertyName)
    const originalMethod = descriptor.value

    descriptor.value = function(...args: any[]) {
      const result = originalMethod.apply(this, args)

      if (result instanceof Promise) {
        result.catch(error => {
          if (error.response) {
            const newError = new Error(
              `[${target.prototype.constructor.name}] ${propertyName} Error: ${error.response.data.message}`
            )

            return newError
          }

          return error
        })
      }

      return result
    }

    Object.defineProperty(target, propertyName, descriptor)
  })
}
