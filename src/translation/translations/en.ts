import type Context from '@nodes/Context';
import type UnknownType from '@nodes/UnknownType';
import type Translation from '../Translation';
import type ListType from '@nodes/ListType';
import type MapType from '@nodes/MapType';
import type MeasurementLiteral from '@nodes/MeasurementLiteral';
import type NameType from '@nodes/NameType';
import type Reference from '@nodes/Reference';
import type SetType from '@nodes/SetType';
import type StreamType from '@nodes/StreamType';
import type UnionType from '@nodes/UnionType';
import {
    AND_SYMBOL,
    OR_SYMBOL,
    NOT_SYMBOL,
    PRODUCT_SYMBOL,
    COMMA_SYMBOL,
    PROPERTY_SYMBOL,
    TRUE_SYMBOL,
    FALSE_SYMBOL,
    SUM_SYMBOL,
    QUOTIENT_SYMBOL,
} from '@parser/Symbols';
import {
    getDimensionDescription,
    getEvaluateDescription,
    getLanguageDescription,
    getPlaceholderDescription,
    getTokenDescription,
    type Description,
} from '../Translation';
import type { CycleType } from '@nodes/CycleType';
import type UnknownNameType from '@nodes/UnknownNameType';
import Explanation from '../Explanation';
import type NodeLink from '../NodeLink';
import type StreamDefinitionType from '@nodes/StreamDefinitionType';
import Emotion from '../../lore/Emotion';
import Unit from '../../nodes/Unit';

const WRITE_DOC = 'TBD';

const en: Translation = {
    language: 'en',
    wordplay: 'Wordplay',
    welcome: 'hello',
    motto: 'Where words come to life',
    terminology: {
        store: 'store',
        code: 'compute',
        decide: 'decide',
        project: 'project',
        source: 'source',
        input: 'input',
        output: 'output',
        type: 'type',
        start: 'start',
    },
    caret: {
        before: (description) => `before ${description}`,
        inside: (description) => `inside ${description}`,
    },
    data: {
        value: 'value',
        text: 'text',
        boolean: 'boolean',
        map: 'map',
        measurement: 'number',
        function: 'function',
        exception: 'exception',
        table: 'table',
        none: 'none',
        list: 'list',
        stream: 'stream',
        structure: 'structure',
        streamdefinition: 'stream definition',
        index: 'index',
        query: 'query',
        row: 'row',
        set: 'set',
        key: 'key',
    },
    evaluation: {
        unevaluated: 'the selected node did not evaluate',
        done: 'done evaluating',
    },
    tokens: {
        EvalOpen: 'evaluation open',
        EvalClose: 'evaluation close',
        SetOpen: 'set/map open',
        SetClose: 'set/map close',
        ListOpen: 'list open',
        ListClose: 'list close',
        TagOpen: 'tag open',
        TagClose: 'tag close',
        Bind: 'bind',
        Access: 'property access',
        Function: 'function',
        Borrow: 'borrow',
        Share: 'share',
        Convert: 'convert',
        Doc: 'documentation',
        Words: 'words',
        Link: 'web link',
        Italic: 'italic',
        Bold: 'bold',
        Extra: 'extra',
        Concept: 'concept link',
        URL: 'URL',
        None: 'nothing',
        Type: 'type',
        TypeOperator: 'is',
        TypeOpen: 'type input open',
        TypeClose: 'type input close',
        Separator: 'name separator',
        Language: 'language tag',
        BooleanType: 'boolean type',
        NumberType: 'number type',
        JapaneseNumeral: 'japanese numeral',
        RomanNumeral: 'roman numeral',
        Pi: 'pi',
        Infinity: 'infinity',
        NoneType: 'none type',
        TableOpen: 'table open',
        TableClose: 'table close',
        Select: 'select',
        Insert: 'insert',
        Update: 'update',
        Delete: 'delete',
        Union: 'union',
        Stream: 'next',
        Change: 'change',
        Initial: 'first evaluation',
        Previous: 'previous',
        Placeholder: 'placeholder',
        Etc: 'et cetera',
        This: 'this',
        UnaryOperator: 'unary operator',
        BinaryOperator: 'binary operator',
        Conditional: 'conditional',
        Text: 'text',
        TemplateOpen: 'text open',
        TemplateBetween: 'text between',
        TemplateClose: 'text close',
        Number: 'number',
        Decimal: 'decimal numeral',
        Base: 'base numeral',
        Boolean: 'boolean',
        Name: 'name',
        Unknown: 'unknown',
        End: 'end',
    },
    nodes: {
        Dimension: {
            label: 'dimension',
            description: getDimensionDescription,
            emotion: Emotion.Serious,
            doc: `I am a *unit of measurement*, like (1m), (10s), (100g), or any other scientific unit. I'm happy to be any unit want to make up too, like (17apple).
            
                I can be combined with other symbols to make compound units like (9.8m/s^2) or (17apple/day).
                
                I must always follow a number. If I don't, I might be mistaken for a name, which would be quite embarassing, because I name units, not values.`,
        },
        Doc: {
            label: 'documentation',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc:
                WRITE_DOC +
                `Describes the purpose of some code.
                
                It can precede any expression, but is most useful before definitions to explain how to use them. 
                Documentation can be tagged with a language`,
        },
        Docs: {
            label: 'documentation list',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC + `a list of documentation`,
        },
        KeyValue: {
            label: 'key/value pair',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc:
                WRITE_DOC +
                `represents a single mapping in a map between a key and a value.`,
        },
        Language: {
            label: 'language tag',
            description: getLanguageDescription,
            emotion: Emotion.TBD,
            doc: `
                Why hello! 
                Have you ever wanted to make it *crystal clear* what lanugage something is? 
                That's what I do. Just a little slash, and a couple letters, and no one will ever be confused about what language some text is in.
                For example, let's say you wanted to say my name, but make it clear I'm in English:
                
                ("Language"/en)
                
                Or, suppose you wanted to do this for a @Name.

                (sound/en: "meow")

                Or even @Doc!

                There are lots of different two letter language codes.
                `,
        },
        Name: {
            label: 'name',
            description: (name) => name.name.getText(),
            emotion: Emotion.TBD,
            doc:
                WRITE_DOC +
                `
                Identifies code.
                
                names are used to represent some value in a program, such as a function, structure type, or a binding in a block. 
                They're a helpful way of giving a shorthand label to some value or way of computing or storing values. 
                Names can be optionally tagged with a language; this is helpful when sharing code, since the language might use to name a function might not be known to people who want to use it. 
                Translating names makes shared code more globally useful.`,
        },
        Names: {
            label: 'name list',
            description: (names) => `${names.names.length} names`,
            emotion: Emotion.TBD,
            doc:
                WRITE_DOC +
                `
                Defines a list of names some code is known by.
                
                Names are separated by ${COMMA_SYMBOL} symbols. 
                Having multiple names is most helpful when you want to use multiple languages.
                `,
        },
        Row: {
            label: 'row',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC + `a row of values, matching a table definition`,
        },
        Token: {
            label: 'token',
            description: getTokenDescription,
            emotion: Emotion.TBD,
            doc: WRITE_DOC + 'the smallest group of symbols in a performance',
        },
        TypeInputs: {
            label: 'type inputs',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc:
                WRITE_DOC +
                `a list of types given to a @FunctionDefinition or @StructureDefinition`,
        },
        TypeVariable: {
            label: 'type variable',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc:
                WRITE_DOC +
                `a placeholder for a type used in a @FunctionDefinition or @StructureDefinition`,
        },
        TypeVariables: {
            label: 'type variables',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC + `a list of @TypeVariable`,
        },
        Paragraph: {
            label: 'paragraph',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc:
                WRITE_DOC +
                `a formatted list of words, links, and example code`,
        },
        WebLink: {
            label: 'link',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC + `a link to something on the web`,
        },
        ConceptLink: {
            label: 'concept',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC + `a link to a concept in Wordplay`,
        },
        Words: {
            label: 'words',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC + `words that are part of @Doc`,
        },
        Example: {
            label: 'example',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC + `a program that illustrates how to use some code`,
        },
        BinaryOperation: {
            label: 'binary operation',
            description: (op) => op.operator.getText(),
            emotion: Emotion.Arrogant,
            doc: `Yo. You need me?
                I'm not suprised, I'm pretty bad ass.
                @Evaluate is nice, but I am *nicer*.
                Give me a left and right value?
                I can do all kinds of things.
                Whatever functions the left value has.
                And I can do it with out all of those annoying parentheses.

                Check this out.

                (1 + 1)
                (1 > 1)
                (1 - 1)
                (1 = 1)

                Did you see that? 
                No parentheses, just a tight little operator in the middle.
                *Sleek*.

                Okay, yeah, I can get ahead of myself.
                I only do left to right.
                I have no idea what "order of operations" is.
                You *might* have to wrap some parentheses around me
                to get what you want.
                But otherwise?
                *Streamlined*.
                `,
            right: 'input',
            start: (left) =>
                Explanation.as('left first! ', left, ', then right!'),
            finish: (result) =>
                Explanation.as(
                    'your value, ',
                    result ?? ' nothing',
                    ', *slick*'
                ),
        },
        Bind: {
            label: 'bind',
            description: (bind) => bind.names.getNames().join(', '),
            emotion: Emotion.Restless,
            doc: `Hello!
                I love names. 
                I name things. 
                Can I name you? 
                Do you have something I can name? 
                Give me an expression and I'll name it!
                I name inputs to @FunctionDefinition and @StructureDefinition, I name values in @Block. I name everything!

                Why name something?
                Well, some of us are fine without a name because we collaborate so closely.
                But sometimes its helpful to give us names so you can refer to us by name instead.
                
                Be careful with names though: once I name a value, it will *always* have that value.
                And also don't like it when multiple things have the same name.
                That just gets confusing.
                One name, one value!

                Oh, but did you know you can have one value *many names*?
                I'm s excited to tell you about this!
                One value, many names. For example:

                (joe,tess,amy: 5)

                See what I did there? 
                One value, three names.
                You can refer to that five by *any* of those names.
                This is especially when you want to give names in many languages:

                (joe/en,aimee/fr,明/zh: 5)

                See what I did *there*? 
                Three names for one value, just in different languages!

                Okay, I have one last secret.
                Did you know that you can tell me what kind of value a name should have, and if it doesn't have it, I will tell you?
                Like this:

                (bignumber•#: "one zillion")

                See, I said (bignumber) should be a number, but it's text, and those aren't compatible and so BOOM!
                I'll let you know if they disagree.
                Sometimes you might *have* to tell me what kind of data something else because I can't figure it out myself.
                `,
            start: (value) =>
                value
                    ? Explanation.as(
                          `Let's see what value we get from `,
                          value,
                          `!`
                      )
                    : 'Mm, no value. I hope I`m in a @FunctionDefinition',
            finish: (value, names) =>
                value
                    ? Explanation.as(
                          'Oh nice, I got ',
                          value,
                          `! Let's name it `,
                          names
                      )
                    : 'Uh oh, no value. How am I suppose to name nothing?',
        },
        Block: {
            label: 'block',
            description: (block) => `${block.statements.length} statements`,
            emotion: Emotion.Grumpy,
            doc: `Have you met my friend @Bind?
                I think you'd know if you had.
                Sometimes they are so annoying.
                They're always like 'name this', 'name that'
                We work together a lot, because my job is to make a
                space to temporarily name complicated things.
                @Bind names them, and I keep track of all the names
                and evaluate to whatever value was last.
                And that makes your job as director easier, right?
                So you can calculate things?

                Well @Bind does *not* make my job easier!
                This happened last week:

                (
                    (
                    a: 1
                    b: 2
                    c: 3
                    d: 4
                    e: 5
                    f: 6
                    g: 7
                    h: 8
                    i: 9
                    j: 10
                    k: 11
                    l: 12
                    m: 13
                    n: 14
                    o: 15
                    p: 16
                    q: 17
                    r: 18
                    s: 19
                    t: 20
                    u: 21
                    v: 22
                    w: 23
                    x: 24
                    y: 25
                    z: 26
                    )
                )

                @Bind just went on and on and on, spelling out the whole alphabet and numbering
                them and I was just like "*Can you just give me 26? You didn't even use any of those names. I could have just passed on 26 and we would have been done.*" 
                Why do you have to name them all?

                This is is why I like working with @FunctionDefinition.
                They put @Bind up there with all the @Name
                I can just focus on my business.
                Of course, @Bind always shows up there too.

                Okay, I think I'm done venting.
                I really do like @Bind.
                They are my friend.
                Their love of names is cute sometimes.
                Sometimes I just need some quiet.`,
            statement: 'statement',
            start: `Here we go with @Bind again, getting all excited about naming things`,
            finish: (value) =>
                Explanation.as(
                    `Finally done. The last thing I got was `,
                    value ?? 'nothing'
                ),
        },
        BooleanLiteral: {
            label: 'boolean',
            description: (literal) => (literal.bool() ? 'true' : 'false'),
            emotion: Emotion.Obsessed,
            doc: `
                Zero. One. Yes. No. True. False. 
                There are only two. 
                True ways and false ways. 
                Yes ways and no ways. 
                Zero ways and one ways. 
                (${TRUE_SYMBOL}) and (${FALSE_SYMBOL}) ways.
                
                But which is right?
                Which is left?
                What do they mean?
                Perhaps @Conditional knows.
                `,
            start: (value) => Explanation.as(value, '!'),
        },
        Borrow: {
            label: 'borrow',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc:
                WRITE_DOC +
                `Use a binding from another source file or project.`,
            start: (source, name) =>
                name === undefined && source === undefined
                    ? 'borrowing nothing'
                    : name === undefined && source !== undefined
                    ? Explanation.as('borrow ', source)
                    : Explanation.as(
                          'borrow ',
                          name ?? ' unspecified name ',
                          ' from ',
                          source ?? ' unspecified source'
                      ),
            source: 'source',
            bind: 'name',
            version: 'version',
        },
        Changed: {
            label: 'changed',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC + `true if a stream caused a program to re-evaluate`,
            start: (stream: NodeLink) =>
                Explanation.as(
                    'check if ',
                    stream,
                    ' caused this program to reevaluate'
                ),
            stream: 'stream',
        },
        Conditional: {
            label: 'conditional',
            description: '',
            emotion: Emotion.Curious,
            doc: `
            Did you ever think about how we decide? 
            I think about that a lot. 
            So many decisions in life can be so complicated. 
            Sometimes I feel a lot of pressure to decide, since I'm the only one in this world who gets to decide.
            
            I get overwhelmed, and so I've tried to simplify things. 
            @BooleanLiteral helps see that I could reduce everything to just two options: (${TRUE_SYMBOL}) and (${FALSE_SYMBOL}).
            If it's (${TRUE_SYMBOL}), then I evaluate my *yes* code. If it's (${FALSE_SYMBOL}), then I evaluate my *no* code.

            I know that decisions are rarely this simple, but breaking down the world into these two options makes things easier for me.
            It's my little way of keeping things organized, even in the face of so much complexity.
            Yes, no, if, else, this, that.
            Hm, I'm starting to sound like @BooleanLiteral...
            `,
            start: (condition) =>
                Explanation.as(
                    `let's see if `,
                    condition,
                    ` is ${TRUE_SYMBOL} or ${FALSE_SYMBOL}`
                ),
            finish: (value) =>
                Explanation.as(`it's `, value ?? ' nothing', '!'),
            condition: 'condition',
            yes: 'yes',
            no: 'no',
        },
        ConversionDefinition: {
            label: 'conversion',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc:
                WRITE_DOC +
                `define a conversion from one value type to another`,
            start: 'define this conversion',
        },
        Convert: {
            label: 'convert',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC + `convert one type of value to another`,
            start: (expr) => Explanation.as('first evaluate ', expr),
            finish: (value) =>
                Explanation.as('converted to ', value ?? 'nothing'),
        },
        Delete: {
            label: 'delete',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC + `delete rows from a table`,
            start: (table) => Explanation.as('evaluate ', table, ' first'),
            finish: (value) =>
                Explanation.as(
                    'evaluated to table without rows, ',
                    value ?? 'nothing'
                ),
        },
        DocumentedExpression: {
            label: 'documented expression',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: 'evaluate the documented expression',
        },
        Evaluate: {
            label: 'evaluate',
            description: getEvaluateDescription,
            emotion: Emotion.Cheerful,
            doc: `
            OMG I am sooo excited to *evaluate functions*. 
            I take a function, and some values, and then I follow the function's steps to compute a value.
            It's like cooking: give me the ingredients and the receipe and I'll make the dish.

            Because I play with functions a lot, @FunctionDefinition is kind of my best friend.
            They say what to do, and I do it, and together we make values for everyone else to use.

            Did you know that @FunctionDefinition and I basically make the whole world of algorithms *work*?
            We're kind of a big deal.
            I mean, I couldn't do it without everyone else, but I'm pretty proud of making all of our
            performances possible.

            @BinaryOperation and @UnaryOperation?
            Yeah, I know them.
            They're cool.
            I mean, they do what I do, and I guess they're a little more compact.
            But they're baaaaasically copying me.
            Sometimes I think they're just trying to look cool.
            `,
            start: (inputs) =>
                inputs
                    ? 'evaluate the inputs first'
                    : 'get the function to evaluate',
            finish: (result) =>
                Explanation.as('function evaluated to ', result ?? 'nothing'),
            function: 'function',
            input: 'input',
        },
        ExpressionPlaceholder: {
            label: 'expression placeholder',
            description: getPlaceholderDescription,
            emotion: Emotion.Sad,
            doc: `
            I can be anything. That might sound amazing, but it's actually really hard, because everyone things of me as temporary. 
            Like, if we were adding some numbers, I might take the place of a number (1 + _), or if someone was evaluating a function with @Evaluate, I might stand in for the function (_(1 2 3)).
            But as soon as someone decides what to replace me with, I'm just discarded.
            Tossed out.
            And so while I can be anything, it's never for long, and I don't get to actually do anything.

            Actually, I do get to do one thing: if someone leaves me in a performance, I will SHUT IT DOWN when it's my turn to dance.
            But it's actually because I don't know what to do.
            Because I can be anything, I not really anything...
            `,
            start: "Stop the performance, I don't know what I am!",
            placeholder: 'expression',
        },
        FunctionDefinition: {
            label: 'function',
            description: (fun, translation) =>
                fun.names.getTranslation(translation.language),
            emotion: Emotion.TBD,
            doc:
                WRITE_DOC +
                `define a function that maps input values to an output value`,
            start: 'define this function',
        },
        HOF: {
            label: 'higher order function',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: 'evaluating the function given',
            finish: (value) =>
                Explanation.as('evaluated to ', value ?? 'nothing'),
        },
        Initial: {
            label: 'initial evaluation',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        Insert: {
            label: 'insert',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: (table) => Explanation.as('evaluate ', table, ' first'),
            finish: (value) =>
                Explanation.as(
                    'evaluated to table new rows, ',
                    value ?? 'nothing'
                ),
        },
        Is: {
            label: 'is',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: (value) => Explanation.as('evaluate ', value, ' first'),
            finish: (is, type) =>
                is
                    ? Explanation.as('value is ', type, ', evaluating to true')
                    : Explanation.as(
                          'value is not ',
                          type,
                          ' evaluating to false'
                      ),
        },
        ListAccess: {
            label: 'list access',
            description: '',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: (list) => Explanation.as('evaluate ', list, ' first'),
            finish: (value) =>
                Explanation.as('item at index is ', value ?? 'nothing'),
        },
        ListLiteral: {
            label: 'list',
            description: (literal) =>
                literal.values.length === 1
                    ? '1 item'
                    : `${literal.values.length} items`,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: 'evaluate items first',
            finish: (value) =>
                Explanation.as('evaluated to list ', value ?? 'nothing'),
            item: 'item',
        },
        MapLiteral: {
            label: 'map',
            description: (literal) =>
                literal.values.length === 1
                    ? '1 item'
                    : `${literal.values.length} items`,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: 'evaluate each key and value first',
            finish: (value) =>
                Explanation.as('evaluated to map ', value ?? 'nothing'),
        },
        MeasurementLiteral: {
            label: 'number',
            description: (node: MeasurementLiteral) =>
                node.number.getText() === 'π'
                    ? 'pi'
                    : node.number.getText() === '∞'
                    ? 'infinity'
                    : node.unit.isUnitless()
                    ? node.number.getText()
                    : `${node.number.getText()} ${node.unit.toWordplay()}`,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: (value) => Explanation.as('evaluate to ', value),
        },
        NativeExpression: {
            label: 'built-in expression',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: 'evaluate the built-in expression',
        },
        NoneLiteral: {
            label: 'nothing',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: 'create a nothing value',
        },
        Previous: {
            label: 'previous',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: (stream) => Explanation.as('first get ', stream),
            finish: (value) =>
                Explanation.as(
                    'evaluated to stream value ',
                    value ?? 'nothing'
                ),
        },
        Program: {
            label: 'program',
            description: '',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: (changes) =>
                changes.length === 0
                    ? 'evaluating program for the first time'
                    : changes.length === 1
                    ? Explanation.as(
                          changes[0].stream,
                          ' produced ',
                          changes[0].value,
                          ' revaluating program'
                      )
                    : Explanation.as(
                          `${changes.length} streams changed (e.g., `,
                          changes[0].stream,
                          ' → ',
                          changes[0].value,
                          '); revaluating program'
                      ),
            finish: (value) =>
                Explanation.as('program evaluated to ', value ?? 'nothing'),
        },
        PropertyBind: {
            label: 'refine',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: 'get the structure',
            finish: (structure) =>
                structure
                    ? Explanation.as('created new structure ', structure)
                    : 'no structure created',
        },
        PropertyReference: {
            label: 'property access',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: 'first get the value',
            finish: (property, value) =>
                property
                    ? Explanation.as(
                          'property ',
                          property,
                          'is ',
                          value ?? 'nothing'
                      )
                    : 'no property name given, no value',
            property: 'property',
        },
        Reaction: {
            label: 'reaction',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: `A reaction to a stream change.`,
            start: 'first check if the stream has changed',
            finish: (value) =>
                Explanation.as(
                    'the stream value is currently ',
                    value ?? 'nothing'
                ),
            initial: 'initial',
            next: 'next',
        },
        Reference: {
            label: 'reference',
            description: (node: Reference) => node.getName(),
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: (name) => Explanation.as('get the value of ', name),
            name: 'name',
        },
        Select: {
            label: 'select',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: (table) => Explanation.as('evaluate ', table, ' first'),
            finish: (value) =>
                Explanation.as(
                    'evaluated to a new table with the selected rows, ',
                    value ?? 'nothing'
                ),
        },
        SetLiteral: {
            label: 'set',
            description: (literal) =>
                literal.values.length === 1
                    ? '1 item'
                    : `${literal.values.length} items`,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: 'evaluate each value first',
            finish: (value) =>
                Explanation.as('evaluated to set ', value ?? 'nothing'),
        },
        SetOrMapAccess: {
            label: 'set/map access',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: (set) => Explanation.as('evaluate ', set, ' first'),
            finish: (value) =>
                Explanation.as('item in  with key is ', value ?? 'nothing'),
        },
        Source: {
            label: 'document',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        StreamDefinition: {
            label: 'stream',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: `defines a stream of values.`,
            start: 'define this stream type',
        },
        StructureDefinition: {
            label: 'structure',
            description: (structure, translation) =>
                structure.names.getTranslation(translation.language),
            emotion: Emotion.TBD,
            doc: `define a data structure that stores values and functions on those values.`,
            start: 'define this structure type',
        },
        TableLiteral: {
            label: 'table',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            item: 'row',
            start: 'first evaluate the rows',
            finish: (table) =>
                Explanation.as('evaluated to new table ', table ?? 'nothing'),
        },
        Template: {
            label: 'text template',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: 'evaluate each expression in the template',
            finish: 'constructing text from the values',
        },
        TextLiteral: {
            label: 'text',
            description: (text) => text.text.getText(),
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: 'create a text value',
        },
        This: {
            label: 'this',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: (value) =>
                Explanation.as('evaluated to ', value ?? 'nothing'),
        },
        UnaryOperation: {
            label: 'unary operation',
            description: (op) => op.operator.getText(),
            emotion: Emotion.Insecure,
            doc: `
            Hi.

            Oh, did you need me?
            Have you talked to @Evaluate or @BinaryOperation?
            They are way cooler than me.

            Yes?
            You still need me?
            I can only do two little things:

            (-5)

            I made that (5) into (-5).

            (~⊥)

            I made that (⊥) into (⊤).

            That's it.
            I'm not very special.
            `,
            start: (value) => Explanation.as('what are you ', value),
            finish: (value) => Explanation.as('I made it ', value ?? 'nothing'),
        },
        UnparsableExpression: {
            label: 'unparsable',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: `a list of unparsable @Token`,
            start: 'cannot evaluate unparsable code',
        },
        Update: {
            label: 'update rows',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
            start: (table) => Explanation.as('evaluate ', table, ' first'),
            finish: (value) =>
                Explanation.as(
                    'evaluated to a new table with revised rows, ',
                    value ?? 'nothing'
                ),
        },
        AnyType: {
            label: 'any type',
            description: '',
            emotion: Emotion.TBD,
            doc: `represents any possible type`,
        },
        BooleanType: {
            label: 'boolean type',
            description: '',
            emotion: Emotion.TBD,
            doc: `a true or false value`,
        },
        ConversionType: {
            label: 'conversion type',
            description: '',
            emotion: Emotion.TBD,
            doc: `a type of function that converts values of one type to another `,
        },
        ExceptionType: {
            label: 'exception type',
            description: '',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        FunctionDefinitionType: {
            label: 'function type',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        FunctionType: {
            label: 'function type',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        ListType: {
            label: 'list type',
            description: (
                node: ListType,
                translation: Translation,
                context: Context
            ) =>
                node.type === undefined
                    ? 'list'
                    : `list of ${node.type.getDescription(
                          translation,
                          context
                      )}`,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        MapType: {
            label: 'map type',
            description: (
                node: MapType,
                translation: Translation,
                context: Context
            ) =>
                node.key === undefined || node.value === undefined
                    ? 'map'
                    : `map of ${node.key.getDescription(
                          translation,
                          context
                      )} to ${node.value.getDescription(translation, context)}`,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        MeasurementType: {
            label: 'number type',
            description: (node, translation, context) =>
                node.unit instanceof Unit
                    ? node.unit.getDescription(translation, context)
                    : 'number',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        NameType: {
            label: 'name type',
            description: (node: NameType) => `${node.name.getText()}`,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        NeverType: {
            label: 'never type',
            description: '',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        NoneType: {
            label: 'nothing type',
            description: '',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        SetType: {
            label: 'set type',
            description: (node: SetType, translation: Translation) =>
                node.key === undefined
                    ? 'anything'
                    : node.key.getLabel(translation),
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        StreamDefinitionType: {
            label: 'stream type',
            description: (
                node: StreamDefinitionType,
                translation: Translation
            ) =>
                `a ${node.definition.names.getTranslation(
                    translation.language
                )} stream`,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        StreamType: {
            label: 'stream type',
            description: (
                node: StreamType,
                translation: Translation,
                context: Context
            ) =>
                `a type of stream of ${node.type.getDescription(
                    translation,
                    context
                )}`,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        StructureDefinitionType: {
            label: 'structure type',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        UnknownType: {
            label: 'unknown type',
            description: (
                node: UnknownType<any>,
                translation: Translation,
                context: Context
            ) => {
                return `unknown, because ${node
                    .getReasons()
                    .map((unknown) => unknown.getReason(translation, context))
                    .join(', because ')}`;
            },
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        TableType: {
            label: 'table type',
            description: '',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        TextType: {
            label: 'text type',
            description: (node) =>
                node.isLiteral() ? node.text.getText() : 'text',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        TypePlaceholder: {
            label: 'placeholder type',
            description: WRITE_DOC,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        UnionType: {
            label: 'option type',
            description: (
                node: UnionType,
                translation: Translation,
                context: Context
            ) =>
                `${node.left.getDescription(
                    translation,
                    context
                )}${OR_SYMBOL}${node.right.getDescription(
                    translation,
                    context
                )}`,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        Unit: {
            label: 'unit',
            description: (node, translation, context) =>
                node.exponents.size === 0
                    ? 'number'
                    : node.numerator.length === 1 &&
                      node.denominator.length === 0
                    ? node.numerator[0].getDescription(translation, context)
                    : node.toWordplay() === 'm/s'
                    ? 'velocity'
                    : node.toWordplay(),
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        UnparsableType: {
            label: 'unparsable type',
            description: '',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        VariableType: {
            label: 'variable type',
            description: '',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        CycleType: {
            label: 'cycle type',
            description: (node: CycleType) =>
                `${node.expression.toWordplay()} depends on itself`,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        UnknownVariableType: {
            label: 'unknown variable type',
            description: '',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        NotAListType: {
            label: 'non-list type',
            description: '',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        NoExpressionType: {
            label: 'non-expression type',
            description: '',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        NotAFunctionType: {
            label: 'non-function type',
            description: '',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        NotATableType: {
            label: 'non-table type',
            description: '',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        NotAStreamType: {
            label: 'non-stream type',
            description: '',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        NotASetOrMapType: {
            label: 'non-set/map type',
            description: '',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        NotEnclosedType: {
            label: 'not in structure, conversion, or reaction',
            description: '',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        NotImplementedType: {
            label: 'unimplemented type',
            description: '',
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
        UnknownNameType: {
            label: 'unknown name type',
            description: (node: UnknownNameType) =>
                node.name === undefined
                    ? "a name wasn't given"
                    : `${node.name.getText()} isn't defined on ${node.why?.toWordplay()}`,
            emotion: Emotion.TBD,
            doc: WRITE_DOC,
        },
    },
    native: {
        bool: {
            doc: `We are single true or false value.
            
            We are the simplest value type, since we can only be one of two values, (⊤) and (⊥).`,
            name: 'boolean type',
            function: {
                and: {
                    doc: WRITE_DOC,
                    name: [AND_SYMBOL, 'and'],
                    inputs: [{ doc: WRITE_DOC, name: 'value' }],
                },
                or: {
                    doc: WRITE_DOC,
                    name: [OR_SYMBOL, 'or'],
                    inputs: [{ doc: WRITE_DOC, name: 'value' }],
                },
                not: {
                    doc: WRITE_DOC,
                    name: NOT_SYMBOL,
                    inputs: [],
                },
                equals: {
                    doc: WRITE_DOC,
                    name: ['=', 'equals'],
                    inputs: [{ doc: WRITE_DOC, name: 'value' }],
                },
                notequal: {
                    doc: WRITE_DOC,
                    name: ['≠'],
                    inputs: [{ doc: WRITE_DOC, name: 'value' }],
                },
            },
            conversion: {
                text: WRITE_DOC,
            },
        },
        none: {
            doc: `I am nothing
            
            I am special because I am only equal to me.
            I can only ever be me and only ever want to be me!`,
            name: 'none type',
            function: {
                equals: {
                    doc: WRITE_DOC,
                    name: ['=', 'equals'],
                    inputs: [{ doc: WRITE_DOC, name: 'value' }],
                },
                notequals: {
                    doc: WRITE_DOC,
                    name: '≠',
                    inputs: [{ doc: WRITE_DOC, name: 'value' }],
                },
            },
            conversion: {
                text: WRITE_DOC,
            },
        },
        text: {
            doc: `We are any words imaginable.
            
            We can represent ideas, stories, words, and more, and even represent other types of values, but as text.`,
            name: 'text type',
            function: {
                length: {
                    doc: WRITE_DOC,
                    name: ['📏', 'length'],
                    inputs: [],
                },
                equals: {
                    doc: WRITE_DOC,
                    name: ['=', 'equals'],
                    inputs: [{ doc: WRITE_DOC, name: 'value' }],
                },
                notequals: {
                    doc: WRITE_DOC,
                    name: '≠',
                    inputs: [{ doc: WRITE_DOC, name: 'value' }],
                },
                repeat: {
                    doc: WRITE_DOC,
                    name: [PRODUCT_SYMBOL, '🔁', 'repeat'],
                    inputs: [{ doc: WRITE_DOC, name: 'count' }],
                },
                segment: {
                    doc: WRITE_DOC,
                    name: [QUOTIENT_SYMBOL, 'segment'],
                    inputs: [{ doc: WRITE_DOC, name: 'delimiter' }],
                },
                combine: {
                    doc: WRITE_DOC,
                    name: [SUM_SYMBOL, 'combine'],
                    inputs: [{ doc: WRITE_DOC, name: 'text' }],
                },
                has: {
                    doc: WRITE_DOC,
                    name: ['has'],
                    inputs: [{ doc: WRITE_DOC, name: 'text' }],
                },
            },
            conversion: {
                text: WRITE_DOC,
                number: WRITE_DOC,
            },
        },
        measurement: {
            doc: `We are any number imaginable, even with units.
            
            We can be integers, real numbers, negative, positive, fractional, decimal. We can be Arabic numbers (123), Roman numerals (ⅩⅩⅩⅠⅩ), Japanese numerals (二十), and more.`,
            name: 'number type',
            function: {
                add: {
                    doc: WRITE_DOC,
                    name: ['+', 'add'],
                    inputs: [{ doc: WRITE_DOC, name: 'number' }],
                },
                subtract: {
                    doc: WRITE_DOC,
                    name: ['-', 'subtract'],
                    inputs: [{ doc: WRITE_DOC, name: 'number' }],
                },
                multiply: {
                    doc: WRITE_DOC,
                    name: [PRODUCT_SYMBOL, 'multiply'],
                    inputs: [{ doc: WRITE_DOC, name: 'number' }],
                },
                divide: {
                    doc: WRITE_DOC,
                    name: ['÷', 'divide'],
                    inputs: [{ doc: WRITE_DOC, name: 'number' }],
                },
                remainder: {
                    doc: WRITE_DOC,
                    name: ['%', 'remainder'],
                    inputs: [{ doc: WRITE_DOC, name: 'number' }],
                },
                truncate: {
                    doc: WRITE_DOC,
                    name: ['truncate'],
                    inputs: [{ doc: WRITE_DOC, name: 'number' }],
                },
                absolute: {
                    doc: WRITE_DOC,
                    name: ['absolute'],
                    inputs: [{ doc: WRITE_DOC, name: 'number' }],
                },
                power: {
                    doc: WRITE_DOC,
                    name: ['^', 'power'],
                    inputs: [{ doc: WRITE_DOC, name: 'number' }],
                },
                root: {
                    doc: WRITE_DOC,
                    name: ['√', 'root'],
                    inputs: [{ doc: WRITE_DOC, name: 'number' }],
                },
                lessThan: {
                    doc: WRITE_DOC,
                    name: ['<', 'lessthan'],
                    inputs: [{ doc: WRITE_DOC, name: 'number' }],
                },
                lessOrEqual: {
                    doc: WRITE_DOC,
                    name: ['≤', 'lessorequal'],
                    inputs: [{ doc: WRITE_DOC, name: 'number' }],
                },
                greaterThan: {
                    doc: WRITE_DOC,
                    name: ['>', 'greaterthan'],
                    inputs: [{ doc: WRITE_DOC, name: 'number' }],
                },
                greaterOrEqual: {
                    doc: WRITE_DOC,
                    name: ['≥', 'greaterorequal'],
                    inputs: [{ doc: WRITE_DOC, name: 'number' }],
                },
                equal: {
                    doc: WRITE_DOC,
                    name: ['=', 'equal'],
                    inputs: [{ doc: WRITE_DOC, name: 'number' }],
                },
                notequal: {
                    doc: WRITE_DOC,
                    name: '≠',
                    inputs: [{ doc: WRITE_DOC, name: 'number' }],
                },
                cos: {
                    doc: WRITE_DOC,
                    name: ['cos', 'cosine'],
                    inputs: [],
                },
                sin: {
                    doc: WRITE_DOC,
                    name: ['sin', 'sine'],
                    inputs: [],
                },
            },
            conversion: {
                text: WRITE_DOC,
                list: WRITE_DOC,
                s2m: WRITE_DOC,
                s2h: WRITE_DOC,
                s2day: WRITE_DOC,
                s2wk: WRITE_DOC,
                s2year: WRITE_DOC,
                s2ms: WRITE_DOC,
                ms2s: WRITE_DOC,
                min2s: WRITE_DOC,
                h2s: WRITE_DOC,
                day2s: WRITE_DOC,
                wk2s: WRITE_DOC,
                yr2s: WRITE_DOC,
                m2pm: WRITE_DOC,
                m2nm: WRITE_DOC,
                m2micro: WRITE_DOC,
                m2mm: WRITE_DOC,
                m2cm: WRITE_DOC,
                m2dm: WRITE_DOC,
                m2km: WRITE_DOC,
                m2Mm: WRITE_DOC,
                m2Gm: WRITE_DOC,
                m2Tm: WRITE_DOC,
                pm2m: WRITE_DOC,
                nm2m: WRITE_DOC,
                micro2m: WRITE_DOC,
                mm2m: WRITE_DOC,
                cm2m: WRITE_DOC,
                dm2m: WRITE_DOC,
                km2m: WRITE_DOC,
                Mm2m: WRITE_DOC,
                Gm2m: WRITE_DOC,
                Tm2m: WRITE_DOC,
                km2mi: WRITE_DOC,
                mi2km: WRITE_DOC,
                cm2in: WRITE_DOC,
                in2cm: WRITE_DOC,
                m2ft: WRITE_DOC,
                ft2m: WRITE_DOC,
                g2mg: WRITE_DOC,
                mg2g: WRITE_DOC,
                g2kg: WRITE_DOC,
                kg2g: WRITE_DOC,
                g2oz: WRITE_DOC,
                oz2g: WRITE_DOC,
                oz2lb: WRITE_DOC,
                lb2oz: WRITE_DOC,
            },
        },
        list: {
            doc: `We group values in sequence.
            
            Keeping this in order is our mission; but we can only do that if we stay together ([]).`,
            name: 'list type',
            kind: 'Kind',
            out: 'Result',
            outofbounds: 'outofbounds',
            function: {
                add: {
                    doc: WRITE_DOC,
                    name: 'add',
                    inputs: [{ doc: WRITE_DOC, name: 'item' }],
                },
                append: {
                    doc: WRITE_DOC,
                    name: [SUM_SYMBOL, 'append'],
                    inputs: [{ doc: WRITE_DOC, name: 'list' }],
                },
                length: {
                    doc: WRITE_DOC,
                    name: ['📏', 'length'],
                    inputs: [],
                },
                random: {
                    doc: WRITE_DOC,
                    name: 'random',
                    inputs: [],
                },
                first: {
                    doc: WRITE_DOC,
                    name: 'first',
                    inputs: [],
                },
                last: {
                    doc: WRITE_DOC,
                    name: 'last',
                    inputs: [],
                },
                has: {
                    doc: WRITE_DOC,
                    name: 'has',
                    inputs: [{ doc: WRITE_DOC, name: 'item' }],
                },
                join: {
                    doc: WRITE_DOC,
                    name: 'join',
                    inputs: [{ doc: WRITE_DOC, name: 'separator' }],
                },
                sansFirst: {
                    doc: WRITE_DOC,
                    name: 'sansFirst',
                    inputs: [],
                },
                sansLast: {
                    doc: WRITE_DOC,
                    name: 'sansLast',
                    inputs: [],
                },
                sans: {
                    doc: WRITE_DOC,
                    name: 'sans',
                    inputs: [{ doc: WRITE_DOC, name: 'value' }],
                },
                sansAll: {
                    doc: WRITE_DOC,
                    name: 'sansAll',
                    inputs: [{ doc: WRITE_DOC, name: 'value' }],
                },
                reverse: {
                    doc: WRITE_DOC,
                    name: 'reverse',
                    inputs: [],
                },
                equals: {
                    doc: WRITE_DOC,
                    name: ['=', 'equals'],
                    inputs: [{ doc: WRITE_DOC, name: 'list' }],
                },
                notequals: {
                    doc: WRITE_DOC,
                    name: '≠',
                    inputs: [{ doc: WRITE_DOC, name: 'list' }],
                },
                translate: {
                    doc: WRITE_DOC,
                    name: 'translate',
                    inputs: [{ doc: WRITE_DOC, name: 'translator' }],
                    value: { doc: WRITE_DOC, name: 'item' },
                    index: { doc: WRITE_DOC, name: 'index' },
                },
                filter: {
                    doc: WRITE_DOC,
                    name: 'filter',
                    inputs: [{ doc: WRITE_DOC, name: 'checker' }],
                    value: { doc: WRITE_DOC, name: 'item' },
                },
                all: {
                    doc: WRITE_DOC,
                    name: 'all',
                    inputs: [{ doc: WRITE_DOC, name: 'checker' }],
                    value: { doc: WRITE_DOC, name: 'item' },
                },
                until: {
                    doc: WRITE_DOC,
                    name: 'until',
                    inputs: [{ doc: WRITE_DOC, name: 'checker' }],
                    value: { doc: WRITE_DOC, name: 'item' },
                },
                find: {
                    doc: WRITE_DOC,
                    name: 'find',
                    inputs: [{ doc: WRITE_DOC, name: 'checker' }],
                    value: { doc: WRITE_DOC, name: 'item' },
                },
                combine: {
                    doc: WRITE_DOC,
                    name: 'combine',
                    inputs: [
                        { doc: WRITE_DOC, name: 'initial' },
                        { doc: WRITE_DOC, name: 'combiner' },
                    ],
                    combination: { doc: WRITE_DOC, name: 'combination' },
                    next: { doc: WRITE_DOC, name: 'next' },
                    index: { doc: WRITE_DOC, name: 'index' },
                },
            },
            conversion: {
                text: WRITE_DOC,
                set: WRITE_DOC,
            },
        },
        set: {
            doc: `We group unique values in no particular order.
            
            We don't like it when there's more than one value of a particular kind! Everything must be unique.`,
            name: 'set type',
            kind: 'Kind',
            function: {
                equals: {
                    doc: WRITE_DOC,
                    name: ['=', 'equals'],
                    inputs: [{ doc: WRITE_DOC, name: 'set' }],
                },
                notequals: {
                    doc: WRITE_DOC,
                    name: '≠',
                    inputs: [{ doc: WRITE_DOC, name: 'set' }],
                },
                add: {
                    doc: WRITE_DOC,
                    name: ['add', '+'],
                    inputs: [{ doc: WRITE_DOC, name: 'set' }],
                },
                remove: {
                    doc: WRITE_DOC,
                    name: ['remove', '-'],
                    inputs: [{ doc: WRITE_DOC, name: 'set' }],
                },
                union: {
                    doc: WRITE_DOC,
                    name: ['union', '∪'],
                    inputs: [{ doc: WRITE_DOC, name: 'set' }],
                },
                intersection: {
                    doc: WRITE_DOC,
                    name: ['intersection', '∩'],
                    inputs: [{ doc: WRITE_DOC, name: 'set' }],
                },
                difference: {
                    doc: WRITE_DOC,
                    name: 'difference',
                    inputs: [{ doc: WRITE_DOC, name: 'set' }],
                },
                filter: {
                    doc: WRITE_DOC,
                    name: 'filter',
                    inputs: [{ doc: WRITE_DOC, name: 'checker' }],
                    value: { doc: WRITE_DOC, name: 'value' },
                },
                translate: {
                    doc: WRITE_DOC,
                    name: 'translate',
                    inputs: [{ doc: WRITE_DOC, name: 'lisetst' }],
                    value: { doc: WRITE_DOC, name: 'value' },
                },
            },
            conversion: {
                text: WRITE_DOC,
                list: WRITE_DOC,
            },
        },
        map: {
            doc: `We map one set of values to another set of values.
            
            Everything inside us must be connected, but to only one thing.`,
            name: 'map type',
            key: 'Key',
            value: 'Value',
            result: 'Result',
            function: {
                equals: {
                    doc: WRITE_DOC,
                    name: ['=', 'equals'],
                    inputs: [{ doc: WRITE_DOC, name: 'value' }],
                },
                notequals: {
                    doc: WRITE_DOC,
                    name: '≠',
                    inputs: [{ doc: WRITE_DOC, name: 'value' }],
                },
                set: {
                    doc: WRITE_DOC,
                    name: 'set',
                    inputs: [
                        { doc: WRITE_DOC, name: 'key' },
                        { doc: WRITE_DOC, name: 'value' },
                    ],
                },
                unset: {
                    doc: WRITE_DOC,
                    name: 'unset',
                    inputs: [{ doc: WRITE_DOC, name: 'key' }],
                },
                remove: {
                    doc: WRITE_DOC,
                    name: 'remove',
                    inputs: [{ doc: WRITE_DOC, name: 'value' }],
                },
                filter: {
                    doc: WRITE_DOC,
                    name: 'filter',
                    inputs: [{ doc: WRITE_DOC, name: 'checker' }],
                    key: { doc: WRITE_DOC, name: 'key' },
                    value: { doc: WRITE_DOC, name: 'value' },
                },
                translate: {
                    doc: WRITE_DOC,
                    name: 'translate',
                    inputs: [{ doc: WRITE_DOC, name: 'translator' }],
                    key: { doc: WRITE_DOC, name: 'key' },
                    value: { doc: WRITE_DOC, name: 'value' },
                },
            },
            conversion: {
                text: WRITE_DOC,
                set: WRITE_DOC,
                list: WRITE_DOC,
            },
        },
    },
    exceptions: {
        function: (name) => Explanation.as("Oops, I don't know how to ", name),
        name: (node, scope) =>
            node
                ? Explanation.as(
                      'There is no value named ',
                      node,
                      ' in ',
                      scope === undefined ? ' this @Block' : scope
                  )
                : Explanation.as("Ack, I didn't get a name!"),
        cycle: (node) => Explanation.as(node, ' depends on itself'),
        functionlimit: (fun) =>
            Explanation.as('evaluated too many functions, especially ', fun),
        steplimit: 'evaluated too many steps in this function',
        type: (expected, given) =>
            Explanation.as('I expected a ', expected, ' but received ', given),
        placeholder: (node) =>
            Explanation.as(`Eek, I don't know what to do, I'm a `, node, `!`),
        unparsable: (node) =>
            Explanation.as('this is ', node, ' is not parsable'),
        value: () =>
            Explanation.as("Oh no! I expected a value, but I didn't get one"),
    },
    conflict: {
        BorrowCycle: {
            primary: (borrow) =>
                Explanation.as(
                    WRITE_DOC + 'this depends on ',
                    borrow,
                    " which depends on this source, so the program can't be evaluated"
                ),
        },
        ReferenceCycle: {
            primary: (ref) =>
                Explanation.as(
                    ref,
                    WRITE_DOC + ' depends on itself, so it cannot be evaluated'
                ),
        },
        DisallowedInputs: {
            primary:
                WRITE_DOC +
                'inputs on interfaces not allowed because one or more of its functions are unimplemented',
        },
        DuplicateName: {
            primary: (name) =>
                Explanation.as(
                    name,
                    WRITE_DOC +
                        ' is already defined, which might intend to refer to the other bind with the same name'
                ),
            secondary: (name) =>
                Explanation.as('this is overwritten by ', name),
        },
        DuplicateShare: {
            primary: (bind) =>
                Explanation.as(
                    WRITE_DOC + 'has the same name as ',
                    bind,
                    ', which makes what is shared ambiguous'
                ),
            secondary: (bind) =>
                Explanation.as(
                    WRITE_DOC + 'has the same name as ',
                    bind,
                    ', which makes what is shared ambiguous'
                ),
        },
        DuplicateTypeVariable: {
            primary: (dupe) =>
                Explanation.as(WRITE_DOC + 'this has the same name as ', dupe),
            secondary: (dupe) =>
                Explanation.as('this has the same name as ', dupe),
        },
        ExpectedBooleanCondition: {
            primary: (type: NodeLink) =>
                Explanation.as(
                    WRITE_DOC + 'expected boolean condition but received ',
                    type
                ),
        },
        ExpectedColumnType: {
            primary: (bind) =>
                Explanation.as(
                    WRITE_DOC + 'this table column ',
                    bind,
                    ' has no type, but all columns require one'
                ),
        },
        ExpectedEndingExpression: {
            primary:
                WRITE_DOC +
                'blocks require at least one expression so that they evaluate to something',
        },
        ExpectedSelectName: {
            primary: (cell) =>
                Explanation.as(
                    cell,
                    WRITE_DOC +
                        ' has no name; selects require column names to know what columns to return'
                ),
        },
        ExpectedUpdateBind: {
            primary: (cell) =>
                Explanation.as(
                    WRITE_DOC,
                    cell,
                    ' has value; updates require a value for each column specified to know what value to set'
                ),
        },
        IgnoredExpression: {
            primary:
                WRITE_DOC +
                'this expression is not used; it will not affect the value of anything',
        },
        IncompleteImplementation: {
            primary:
                WRITE_DOC +
                `structures must either be fully implemented or not implemented; this has a mixture`,
        },
        IncompatibleBind: {
            primary: (expected) =>
                Explanation.as(
                    WRITE_DOC + `I think I'm supposed to be a `,
                    expected
                ),
            secondary: (given, expected) =>
                Explanation.as(
                    `Hey, I got a `,
                    given,
                    ` instead of a `,
                    expected
                ),
        },
        IncompatibleCellType: {
            primary: (expected) =>
                Explanation.as(WRITE_DOC + 'expected column type ', expected),
            secondary: (given) => Explanation.as('given ', given),
        },
        IncompatibleInput: {
            primary: (given, expected) =>
                Explanation.as(
                    `I think I'm supposed to be a `,
                    expected,
                    ", but I'm a ",
                    given
                ),
            secondary: (given, expected) =>
                Explanation.as(
                    `Umm, I got a `,
                    given,
                    ' instead of ',
                    expected
                ),
        },
        IncompatibleKey: {
            primary: (expected) =>
                Explanation.as(WRITE_DOC + 'expected ', expected, ' key '),
            secondary: (given) => Explanation.as('given ', given),
        },
        ImpossibleType: {
            primary: WRITE_DOC + 'this can never be this type',
        },
        InvalidLanguage: {
            primary: WRITE_DOC + `this is not a valid language code`,
        },
        InvalidRow: {
            primary: WRITE_DOC + `row is missing one or more required columns`,
        },
        InvalidTypeInput: {
            primary: (def) =>
                Explanation.as(
                    WRITE_DOC,
                    def,
                    ` does not expect this type input`
                ),
            secondary: (type) =>
                Explanation.as('this definition does expect type ', type),
        },
        MisplacedConversion: {
            primary:
                WRITE_DOC + `conversions only allowed in structure definitions`,
        },
        MisplacedInput: {
            primary: WRITE_DOC + `this input is out of the expected order`,
        },
        MisplacedShare: {
            primary: WRITE_DOC + `shares only allowed at top level of program`,
        },
        MisplacedThis: {
            primary:
                WRITE_DOC +
                `${PROPERTY_SYMBOL} only allowed in structure definition, conversion definition, or reaction`,
        },
        MissingCell: {
            primary: (column) =>
                Explanation.as(
                    WRITE_DOC + `this row is missing column`,
                    column
                ),
            secondary: (row) =>
                Explanation.as(
                    `this column is required, but `,
                    row,
                    ' did not provide it'
                ),
        },
        MissingInput: {
            primary: (input) =>
                Explanation.as('I need ', input, ', can you add one?'),
            secondary: (evaluate) =>
                Explanation.as(
                    `this input is required, but `,
                    evaluate,
                    ' did not provide it'
                ),
        },
        MissingLanguage: {
            primary:
                WRITE_DOC +
                'no language was provided, but there was a slash suggesting one would be',
        },
        MissingShareLanguages: {
            primary:
                WRITE_DOC +
                'shared bindings must specify language so others know what languages are supported',
        },
        NoExpression: {
            primary:
                WRITE_DOC +
                `functions require an expression, but none was provided for this one`,
        },
        NonBooleanQuery: {
            primary: (type) =>
                Explanation.as(
                    WRITE_DOC + 'queries must be boolean, but this is a ',
                    type
                ),
        },
        NotAFunction: {
            primary: (name, type) =>
                Explanation.as(
                    WRITE_DOC,
                    name ? name : 'this',
                    ' is not a function ',
                    type ? ' in ' : ' in scope',
                    type ? type : ''
                ),
        },
        NotAList: {
            primary: (type) =>
                Explanation.as(WRITE_DOC, 'expected a list, this is a ', type),
        },
        NotAListIndex: {
            primary: (type) =>
                Explanation.as(WRITE_DOC, 'expected number, this is a ', type),
        },
        NotAMap: {
            primary:
                WRITE_DOC +
                'this expression is not allowed in a map, only key/value pairs are allowed',
            secondary: (expr) => Explanation.as('this map has a ', expr),
        },
        NotANumber: {
            primary: WRITE_DOC + "this number isn't formatted correctly",
        },
        NotAnInterface: {
            primary:
                WRITE_DOC +
                'this is not an interface; structures can only implement interfaces, not other structures',
        },
        NotASetOrMap: {
            primary: (type) =>
                Explanation.as(
                    WRITE_DOC,
                    'expected set or map, but this is a ',
                    type
                ),
        },
        NotAStream: {
            primary: (type) =>
                Explanation.as(
                    WRITE_DOC,
                    'expected stream, but this is a ',
                    type
                ),
        },
        NotAStreamIndex: {
            primary: (type) =>
                Explanation.as(
                    WRITE_DOC,
                    'expected a number, but this is a ',
                    type
                ),
        },
        NotATable: {
            primary: (type) =>
                Explanation.as(
                    WRITE_DOC,
                    'expected a table, but this is a ',
                    type
                ),
        },
        NotInstantiable: {
            primary:
                WRITE_DOC +
                'cannot make this structure because it refers to an interface',
        },
        OrderOfOperations: {
            primary:
                WRITE_DOC +
                'operators evalute left to right, unlike math; use parentheses to specify order of evaluation',
        },
        Placeholder: {
            primary: `I'm a placeholder. Can you please find someone to replace me for the performance?`,
        },
        RequiredAfterOptional: {
            primary:
                WRITE_DOC + 'required inputs cannot come after optional ones',
        },
        UnclosedDelimiter: {
            primary: (token, expected) =>
                Explanation.as(
                    WRITE_DOC,
                    'expected ',
                    expected,
                    ' to match ',
                    token
                ),
        },
        UnexpectedEtc: {
            primary:
                WRITE_DOC +
                'variable length inputs can only appear on function evaluations',
        },
        UnexpectedInput: {
            primary: (evaluation) =>
                Explanation.as(
                    WRITE_DOC,
                    'this input is not specified on ',
                    evaluation
                ),
            secondary: (input) =>
                Explanation.as('this function does not expect this ', input),
        },
        UnexpectedTypeVariable: {
            primary: 'type inputs not allowed on type variables',
        },
        UnimplementedInterface: {
            primary: (inter, fun) =>
                Explanation.as(
                    WRITE_DOC,
                    'this structure implements ',
                    inter,
                    ' but does not implement ',
                    fun
                ),
        },
        UnknownBorrow: {
            primary: WRITE_DOC + 'unknown source and name',
        },
        UnknownColumn: {
            primary: WRITE_DOC + 'unknown column in table',
        },
        UnknownConversion: {
            primary: (from, to) =>
                Explanation.as(
                    WRITE_DOC,
                    'no conversion from ',
                    from,
                    ' to ',
                    to
                ),
        },
        UnknownInput: {
            primary: WRITE_DOC + 'no input by this name',
        },
        UnknownName: {
            primary: (name, type) =>
                Explanation.as(
                    `No one has this name in `,
                    type ? type : ' this @Block'
                ),
        },
        InvalidTypeName: {
            primary: (type) =>
                Explanation.as(
                    WRITE_DOC,
                    'type names can only refer to structures or type variables, but this refers to a ',
                    type
                ),
        },
        Unnamed: {
            primary: WRITE_DOC + 'missing name',
        },
        UnparsableConflict: {
            primary: (expression) =>
                expression
                    ? WRITE_DOC + 'expected expression, but could not parse one'
                    : 'expected type, but could not parse one',
        },
        UnusedBind: {
            primary: `Hey, can I help? No one is saying my name :(`,
        },
        InputListMustBeLast: {
            primary: 'list of inputs must be last',
        },
    },
    step: {
        stream: 'keeping the stream instead of getting its latest value',
        jump: 'jumping past code',
        jumpif: (yes) => (yes ? 'jumping over code' : 'not jumping over code'),
        halt: 'encountered exception, stopping',
        initialize: 'preparing to process items',
        evaluate: 'starting evaluation',
        next: 'apply the function to the next item',
        check: 'check the result',
    },
    transform: {
        add: (node: Description) => ` add ${node}`,
        append: (node: Description) => `append ${node}`,
        remove: (node: Description) => `remove ${node}`,
        replace: (node: Description | undefined) =>
            `replace with ${node ?? 'nothing'}`,
    },
    ui: {
        placeholders: {
            code: 'code',
            expression: 'value',
            type: 'type',
            percent: 'percent',
            name: 'name',
            project: 'untitled',
            email: 'email',
        },
        tooltip: {
            yes: 'confirm',
            no: 'cancel',
            play: 'evaluate the program fully',
            pause: 'evaluate the program one step at a time',
            back: 'back one step',
            backInput: 'back one input',
            out: 'step out of this function',
            forward: 'forward one step',
            forwardInput: 'forward one input',
            present: 'to the present',
            start: 'to the beginning',
            reset: 'restart the evaluation of the project from the beginning.',
            home: 'return to the types menu',
            revert: 'revert to default',
            set: 'edit this property',
            fullscreen: 'fill the browser with this window',
            collapse: 'collapse window',
            expand: 'expand window',
            close: 'close this project',
            language: 'change preferred languages',
            horizontal: 'switch to horizontal arrangement',
            vertical: 'switch to vertical arrangement',
            freeform: 'switch to free form arrangement',
            fit: 'fit to content',
            grid: 'show/hide grid',
            addPose: 'add pose',
            removePose: 'remove pose',
            movePoseUp: 'move pose up',
            movePoseDown: 'move pose down',
            addPhrase: 'add a phrase after this',
            addGroup: 'add a group after this',
            removeContent: 'remove this content',
            moveContentUp: 'move this content up',
            moveContentDown: 'move this content down',
            editContent: 'edit this content',
            sequence: 'convert to a sequence',
            animate: 'toggle animations on/off',
            addSource: 'create a new source',
            deleteSource: 'remove this source',
            deleteProject: 'delete this project',
            editProject: 'edit this project',
            settings: 'show settings',
            newProject: 'new project',
            dark: 'toggle dark mode on, off, and default',
        },
        prompt: {
            deleteSource: 'delete',
            deleteProject: 'delete',
        },
        labels: {
            learn: 'learn more …',
            nodoc: 'Who am I? What am I? What is my purpose?',
            mixed: 'mixed',
            computed: 'computed',
            default: 'default',
            inherited: 'inherited',
            notSequence: 'not a sequence',
            notContent: 'not a content list',
            anonymous: 'anonymous',
        },
        tiles: {
            output: '💬',
            docs: '📕',
            palette: '🎨',
        },
        headers: {
            editing: 'edit me!',
            projects: 'Projects',
            examples: 'Examples',
        },
        section: {
            project: 'project',
            conflicts: 'conflicts',
            timeline: 'timeline',
            toolbar: 'toolbar',
            output: 'output',
            palette: 'palette',
            editor: 'code editor',
        },
        feedback: {
            unknownProject: "There's no project with this ID.",
        },
        login: {
            header: 'Login',
            prompt: 'Log in to access your projects.',
            anonymousPrompt:
                'Your projects are saved on this device. Create an account to save them online.',
            submit: 'send a login email',
            enterEmail:
                "It looks like you're logging in on a different device. Can you enter your email again?",
            sent: 'Check your email for a link.',
            success: 'Account created!',
            failure: "Couldn't reach the database",
            expiredFailure: 'This link expired.',
            invalidFailure: "This link isn't valid.",
            emailFailure: "This email wasn't valid.",
            logout: 'logout',
            offline: 'You appear to be offline.',
        },
        edit: {
            wrap: 'parentheize',
            unwrap: 'unwrap',
            bind: 'name this expression',
        },
    },
    input: {
        random: {
            doc: WRITE_DOC,
            name: ['🎲', 'random'],
            min: { name: 'min', doc: WRITE_DOC },
            max: { name: 'max', doc: WRITE_DOC },
        },
        mousebutton: {
            doc: WRITE_DOC,
            name: ['🖱️', 'mousebutton'],
            down: { name: 'down', doc: WRITE_DOC },
        },
        mouseposition: {
            doc: WRITE_DOC,
            name: ['👆🏻', 'mouseposition'],
        },
        keyboard: {
            doc: WRITE_DOC,
            name: ['⌨️', 'keyboard'],
            key: { name: 'key', doc: WRITE_DOC },
            down: { name: 'down', doc: WRITE_DOC },
        },
        time: {
            doc: WRITE_DOC,
            name: ['🕕', 'time'],
            frequency: {
                name: ['frequency'],
                doc: WRITE_DOC,
            },
        },
        microphone: {
            doc: WRITE_DOC,
            name: ['🎤', 'microphone'],
            frequency: {
                name: ['frequency'],
                doc: WRITE_DOC,
            },
        },
        camera: {
            doc: WRITE_DOC,
            name: ['🎥', 'camera'],
            width: {
                name: ['width'],
                doc: WRITE_DOC,
            },
            height: {
                name: ['height'],
                doc: WRITE_DOC,
            },
            frequency: {
                name: ['frequency'],
                doc: WRITE_DOC,
            },
        },
        reaction: {
            doc: WRITE_DOC,
            name: 'reaction',
        },
        motion: {
            doc: WRITE_DOC,
            name: ['⚽️', 'Motion'],
            type: {
                doc: WRITE_DOC,
                name: 'type',
            },
            vx: {
                doc: WRITE_DOC,
                name: 'vx',
            },
            vy: {
                doc: WRITE_DOC,
                name: 'vy',
            },
            vz: {
                doc: WRITE_DOC,
                name: 'vz',
            },
            vangle: {
                doc: WRITE_DOC,
                name: 'vangle',
            },
            mass: {
                doc: WRITE_DOC,
                name: 'mass',
            },
            bounciness: {
                doc: WRITE_DOC,
                name: 'bounciness',
            },
            gravity: {
                doc: WRITE_DOC,
                name: 'gravity',
            },
        },
    },
    output: {
        type: {
            definition: { doc: WRITE_DOC, name: 'Type' },
            size: { doc: WRITE_DOC, name: 'size' },
            family: { doc: WRITE_DOC, name: 'font' },
            place: { doc: WRITE_DOC, name: 'place' },
            rotation: { doc: WRITE_DOC, name: 'rotation' },
            name: { doc: WRITE_DOC, name: 'name' },
            enter: { doc: WRITE_DOC, name: 'enter' },
            rest: { doc: WRITE_DOC, name: 'rest' },
            move: { doc: WRITE_DOC, name: 'move' },
            exit: { doc: WRITE_DOC, name: 'exit' },
            duration: { doc: WRITE_DOC, name: ['⏳', 'duration'] },
            style: { doc: WRITE_DOC, name: 'style' },
        },
        group: {
            definition: { doc: WRITE_DOC, name: ['🔳', 'Group'] },
            content: { doc: WRITE_DOC, name: 'content' },
            layout: { doc: WRITE_DOC, name: 'layout' },
        },
        phrase: {
            definition: { doc: WRITE_DOC, name: ['💬', 'Phrase'] },
            text: { doc: WRITE_DOC, name: 'text' },
        },
        layout: {
            definition: { doc: WRITE_DOC, name: ['⠿', 'Layout'] },
        },
        pose: {
            definition: { doc: WRITE_DOC, name: ['🤪', 'Pose'] },
            duration: { doc: WRITE_DOC, name: 'duration' },
            style: { doc: WRITE_DOC, name: 'style' },
            color: { doc: WRITE_DOC, name: 'color' },
            opacity: { doc: WRITE_DOC, name: 'opacity' },
            offset: { doc: WRITE_DOC, name: 'offset' },
            tilt: { doc: WRITE_DOC, name: 'tilt' },
            scale: { doc: WRITE_DOC, name: 'scale' },
            flipx: { doc: WRITE_DOC, name: 'flipx' },
            flipy: { doc: WRITE_DOC, name: 'flipy' },
        },
        color: {
            definition: { doc: WRITE_DOC, name: ['🌈', 'Color'] },
            lightness: { doc: WRITE_DOC, name: ['lightness', 'l'] },
            chroma: { doc: WRITE_DOC, name: ['chroma', 'c'] },
            hue: { doc: WRITE_DOC, name: ['hue', 'h'] },
        },
        sequence: {
            definition: { doc: WRITE_DOC, name: ['┅', 'Sequence'] },
            count: { doc: WRITE_DOC, name: 'count' },
            timing: { doc: WRITE_DOC, name: 'timing' },
            poses: { doc: WRITE_DOC, name: 'poses' },
        },
        place: {
            definition: { doc: WRITE_DOC, name: ['📍', 'Place'] },
            x: { doc: WRITE_DOC, name: 'x' },
            y: { doc: WRITE_DOC, name: 'y' },
            z: { doc: WRITE_DOC, name: 'z' },
        },
        row: {
            definition: { doc: WRITE_DOC, name: ['➡', 'Row'] },
            description: WRITE_DOC,
            padding: { doc: WRITE_DOC, name: 'padding' },
        },
        stack: {
            definition: { doc: WRITE_DOC, name: ['⬇', 'Stack'] },
            description: WRITE_DOC,
            padding: { doc: WRITE_DOC, name: 'padding' },
        },
        verse: {
            definition: { doc: WRITE_DOC, name: ['🌎', '🌍', '🌏', 'Verse'] },
            description: WRITE_DOC,
            content: { doc: WRITE_DOC, name: 'content' },
            background: { doc: WRITE_DOC, name: 'background' },
        },
        easing: {
            straight: 'straight',
            cautious: 'cautious',
            pokey: 'pokey',
            zippy: 'zippy',
        },
    },
    animation: {
        sway: {
            doc: WRITE_DOC,
            name: ['sway'],
            angle: { doc: WRITE_DOC, name: ['angle'] },
        },
        bounce: {
            doc: WRITE_DOC,
            name: ['bounce'],
            height: { doc: WRITE_DOC, name: ['height'] },
        },
    },
};

export default en;
