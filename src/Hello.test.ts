import {Hello} from "./Hello";

test('foo', () => {
    expect(new Hello().greet()).toBe("Hello World!");
})
