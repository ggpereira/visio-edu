function hello() {
    return "Hello;"
}

test('return hello string', () => {
    expect(hello() == 'Hello');
})

